const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password/update').put(isAuthenticatedUser, updateUserPassword);
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles("Admin"), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("Admin"), getUser).put(isAuthenticatedUser, authorizeRoles("Admin"), updateUserRole).delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteUser);


module.exports = router;