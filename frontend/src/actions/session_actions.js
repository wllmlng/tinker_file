// export const login = (user) => dispatch => {
//     return APIutil.login(user).then((res) => {
//             const { token } = res.data;
//             localStorage.setItem('jwtToken', token);
//             APIutil.setAuthToken(token);
//             const decoded = jwt_decode(token);
//             dispatch(receiveCurrentUser(decoded));
//         }).catch(err => {
//             dispatch(receiveErrors(err.response.data));
//         })
// }



// login(userData).then(res => {
//             const { token } = res.data;
//             localStorage.setItem('jwtToken', token);
//             setAuthToken(token);
//             const decoded = jwt_decode(token);
//             //! console.log(decoded)
//             dispatch({
//                 type: "RECEIVE_CURRENT_USER",
//                 currentUser: decoded
//             })
//             // console.log('res',res)
//             // console.log('state',state)
//         })
//         // .catch(err => {
//             //     dispatch(receiveErrors(err.response.data));
//         // })