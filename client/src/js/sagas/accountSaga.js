import { takeEvery, put, call } from 'redux-saga/effects'
import { FETCH_ACCOUNT_REQUEST, UPDATE_ACCOUNT_REQUEST, UPDATE_ACCOUNT_PASSWORD_REQUEST } from '../constants/action-types'
import * as Request from '../util/request'
import { API_URL } from '../constants/config'
import {
    fetchAccountSuccess, fetchAccountFailure,
    updateMemberFailure, updateAccountSuccess
} from '../actions/action'

export function* watchAccount() {
    yield takeEvery(FETCH_ACCOUNT_REQUEST, fetchAccount)
    // TODO: ここeveryでいいんか？
    yield takeEvery(UPDATE_ACCOUNT_REQUEST, updateAccount)
    yield takeEvery(UPDATE_ACCOUNT_PASSWORD_REQUEST, updatePassword)
}

function* fetchAccount() {
    try {
        const payload = yield call(getAccount)
        yield put(fetchAccountSuccess(payload))
    } catch (e) {
        yield put(fetchAccountFailure(e))
    }
}

function* updateAccount(action) {
    try {
        const payload = yield call(putAccount, action.payload.body)
        yield put(updateAccountSuccess(payload))
    } catch(e) {
        yield put(updateMemberFailure(e))
    }
}

function* updatePassword(action) {
    try {
        const payload = yield call(putPassword, action.payload.body)
        yield put(updateAccountSuccess(payload))
    } catch (e) {
        yield put(updateMemberFailure(e))
    }
}

function getAccount() {
    return Request.get(API_URL+"/account")
}

function putAccount(body) {
    return Request.put(API_URL+"/account", body)
}

function putPassword(body) {
    return Request.put(API_URL + "/account/password", body)
}

