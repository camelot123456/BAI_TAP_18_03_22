import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import parseJwt from '../../../../commons/jwt-common';
import paypalAction from '../../../../redux/actions/paypal-action';

function HandleCreateOrder () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const authProvider = useSelector(state => state.authReducer.authProvider)
    const accessToken = parseJwt(authProvider.accessToken)

    useEffect(() => {
        dispatch(paypalAction.doCreateOrderBackend(searchParams.get('token'), accessToken.sub))
        .then(() => {
            navigate(`/capture?token=${searchParams.get('token')}&PayerID=${searchParams.get('PayerID')}`)
        })
    }, []) 

    return (
        <>
            <h3>Redirect...</h3>
        </>
    )
}

export default HandleCreateOrder