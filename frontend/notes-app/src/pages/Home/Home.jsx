import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import AddNotesImg from "../../assets/images/add-notes.svg";
import NoDataImg from "../../assets/images/no-data.svg";
import BgImage from '../../assets/images/bg.jpg'; // Adjust the path if necessary

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: "",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });

    setTimeout(() => {
      handleCloseToast();
    }, 3000);
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      } else {
        console.error("Failed to fetch user info", error);
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again later.", error);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", 'delete');
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error("An unexpected error occurred. Please try again.", error);
      }
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
        isPinned: !noteData.isPinned,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Pinned Successfully", "edit");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const closeModal = () => {
    setOpenAddEditModal({ isShown: false, type: 'add', data: null });
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      
      <div className='container mx-auto '>
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-3 gap-4 mt-8'>
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
                
              />
            ))}
          </div>
        ) : (
          <EmptyCard 
            imgSrc={isSearch ? NoDataImg : AddNotesImg} 
            message={isSearch ? 
              `Ooops!! No notes found matching your search` : 
              `Start creating your first note!! Click the '+' button to jot down your thoughts, ideas, and reminders. Let's get started!`}
          />
        )}
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: 'add', data: null });
        }}
      >
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          content: {
            width: '40%',
            maxHeight: '75%',
            backgroundColor: 'white',
            borderRadius: '8px',
            margin: 'auto',
            padding: '20px',
            overflow: 'scroll',
          },
        }}
        contentLabel={openAddEditModal.type === 'add' ? 'Add Note' : 'Edit Note'}
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={closeModal}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      {showToastMsg.isShown && (
        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
};

export default Home;
