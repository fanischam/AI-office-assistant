import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Modal, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../slices/usersApiSlice';
import { setCredentials, logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../types/storeTypes';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [activeTab, setActiveTab] = useState<
    'updateName' | 'changePassword' | 'deleteProfile'
  >('updateName');
  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteProfile, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  const handleUpdateProfileName = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await updateProfile({
        id: userInfo?.id,
        name,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success('Profile name updated successfully');
      setShowUpdateModal(false);
    } catch (error: any) {
      toast.error(error.data?.message || 'Error updating profile name');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const res = await updateProfile({
        id: userInfo?.id,
        oldPassword,
        newPassword,
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success('Password changed successfully');
      setShowUpdateModal(false);
    } catch (error: any) {
      toast.error(error.data?.message || 'Error changing password');
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile({ id: userInfo?.id }).unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Profile deleted successfully');
    } catch (error: any) {
      toast.error(error.data?.message || 'Error deleting profile');
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'updateName':
        return (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setShowUpdateModal(true);
            }}
          >
            <Form.Group controlId='name' className='my-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='my-3'>
              <Form.Label>Confirm Password Again</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type='submit' variant='dark' disabled={isUpdating}>
              {isUpdating ? <Loader /> : 'Update Profile Name'}
            </Button>
          </Form>
        );
      case 'changePassword':
        return (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setShowUpdateModal(true);
            }}
          >
            <Form.Group controlId='oldPassword' className='my-3'>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your old password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='newPassword' className='my-3'>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your new password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='confirmNewPassword' className='my-3'>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm your new password'
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type='submit' variant='dark' disabled={isUpdating}>
              {isUpdating ? <Loader /> : 'Change Password'}
            </Button>
          </Form>
        );
      case 'deleteProfile':
        return (
          <>
            <p>
              Deleting your profile will remove all your data from our system.
              This action is irreversible. If you proceed, your account and all
              related data will be permanently deleted.
            </p>
            <Button
              variant='danger'
              onClick={handleDeleteClick}
              disabled={isDeleting}
            >
              {isDeleting ? <Loader /> : 'Delete Account'}
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Row className='w-100'>
      <Col xs={12} md={3} className='my-5 px-5'>
        <Nav variant='pills' className='flex-column'>
          <Nav.Item>
            <Nav.Link
              eventKey='updateName'
              active={activeTab === 'updateName'}
              onClick={() => setActiveTab('updateName')}
            >
              Update Profile Name
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey='changePassword'
              active={activeTab === 'changePassword'}
              onClick={() => setActiveTab('changePassword')}
            >
              Change Password
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey='deleteProfile'
              active={activeTab === 'deleteProfile'}
              onClick={() => setActiveTab('deleteProfile')}
            >
              Delete Profile
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col xs={12} md={9} className='w-50 my-5 mx-auto'>
        <h2>
          {activeTab === 'updateName'
            ? 'Update Profile Name'
            : activeTab === 'changePassword'
            ? 'Change Password'
            : 'Delete Profile'}
        </h2>
        {renderActiveTab()}
      </Col>

      {/* Update Confirmation Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm{' '}
            {activeTab === 'updateName'
              ? 'Profile Name Update'
              : 'Password Change'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{' '}
          {activeTab === 'updateName'
            ? 'update your profile name'
            : 'change your password'}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button
            variant='dark'
            onClick={
              activeTab === 'updateName'
                ? handleUpdateProfileName
                : handleChangePassword
            }
          >
            Yes, {activeTab === 'updateName' ? 'Update' : 'Change'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleDeleteProfile}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default ProfileScreen;
