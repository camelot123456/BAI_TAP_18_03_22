import React, { useEffect, useRef } from "react";
import parseJwt from "../../../../commons/jwt-common";
import { ACCESS_TOKEN, KEY_AUTH } from "../../../../constants/system-constant";
import { Navigate, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doDelete, showFindAllUserByIdUser, showUserList } from "../../../../redux/actions/user-action";
import '../../../../App.css'
import { showRoleList } from "../../../../redux/actions/role-action";

function Users () {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const users = useSelector(state => state.userReducer.users)
    

    const tokenRef = useRef('')
    tokenRef.current = parseJwt(localStorage.getItem(ACCESS_TOKEN).substring(KEY_AUTH.length))



    useEffect(() => {
        dispatch(showUserList())
    }, [])
    
    useEffect(() => {
        dispatch(showRoleList())
    }, [])

    const handleSelect = (idUser) => {
        dispatch(showFindAllUserByIdUser(idUser))
        .then(() => {
            navigate(`/admin/users/${idUser}/edit`)
        })
    }

    const handleCreate = () => {
        navigate("/admin/users/add")
    }
    
    const handleDelete = (idUser) => {
        dispatch(doDelete({id: idUser}))
        .then(() => {
            alert('Successfully deleted.')
        })
        .catch(() => {
            alert('Failure deleted.')
        })
        .finally(() => {
            dispatch(showUserList())
        })
    }

    return (
        <>  
            {tokenRef.current.roles.some((role) => role === 'ROLE_ADMIN' || role === 'ROLE_SUPER_ADMIN') ? 
            (
                <>
                    <h1>Users Management</h1>
                    <hr />
                    <button onClick={handleCreate}>Add</button>

                    <table className="table-1 mt-4">
                        <thead>
                            <tr>
                                <th className="th-1">id</th>
                                <th className="th-1">name</th>
                                <th className="th-1">username</th>
                                <th className="th-1">tool</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users ? (

                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td className="td-1">{user.id}</td>
                                        <td className="td-1">{user.name}</td>
                                        <td className="td-1">{user.username}</td>
                                        <td className="td-1">
                                            <button type="button" onClick={() => handleSelect(user.id)}>edit</button>{'    '}

                                            <button type="button" onClick={() => handleDelete(user.id)}>delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <th>Empty List!</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <Navigate to="/error403" />
            )}
        </>
    )
}

export default Users