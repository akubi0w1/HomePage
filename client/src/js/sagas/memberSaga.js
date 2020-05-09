import { takeEvery, put, call } from 'redux-saga/effects'
import { UPDATE_MEMBER_REQUEST, FETCH_MEMBERS_REQUEST, FETCH_MEMBER_REQUEST, CREATE_MEMBER_REQUEST, DELETE_MEMBER_REQUEST } from '../constants/action-types'
import * as Request from '../util/request'
import { API_URL } from '../constants/config'
import { updateMemberFailure, updateMemberSuccess, 
    fetchMembersSuccess, fetchMembersFailure, 
    fetchMemberSuccess, fetchMemberFailure, createMemberSuccess, createMemberFailure
    } from '../actions/action'

// watcher
export function* watchMembers() {
    yield takeEvery(FETCH_MEMBERS_REQUEST, fetchMembers)
    yield takeEvery(FETCH_MEMBER_REQUEST, fetchMember)
    yield takeEvery(CREATE_MEMBER_REQUEST, createMember)
    yield takeEvery(UPDATE_MEMBER_REQUEST, updateMember)
    yield takeEvery(DELETE_MEMBER_REQUEST, removeMember)
}

// worker
function* fetchMembers() {
    try {
        const payload = yield call(getMembers)
        yield put(fetchMembersSuccess(payload))
    } catch(e) {
        yield put(fetchMembersFailure(e))
    }
}

function* fetchMember(action){
    try {
        const payload = yield call(getMember, action.payload.id)
        yield put(fetchMemberSuccess(payload))
    } catch(e) {
        yield put(fetchMemberFailure(e))
    }
}

function* createMember(action) {
    try {
        const payload = yield call(postMember, action.payload.body)
        yield put(createMemberSuccess(payload))
    } catch(e) {
        yield put(createMemberFailure(e))
    }
}

function* updateMember(action) {
    try {
        const payload = yield call(putMember, action.payload.id, action.payload.body)
        yield put(updateMemberSuccess(payload))
    } catch(e) {
        yield put(updateMemberFailure(e))
    }
}

function* removeMember(action) {
    try {
        const payload = yield call(deleteMember, action.payload.id)
        yield put(updateMemberSuccess(payload))
    } catch(e) {
        yield put(updateMemberFailure(e))
    }
}

// api call
function getMembers() {
    const options = { withCredentials: true }
    return Request.httpGet(API_URL + "/users", options)
}

function getMember(id) {
    const options = { withCredentials: true }
    return Request.httpGet(API_URL+"/users/"+id, options)
}

function postMember(body) {
    const options = { withCredentials: true }
    return Request.httpPost(API_URL+"/users", body, options)
}

function putMember(id, body) {
    const options = { withCredentials: true }
    return Request.httpPut(API_URL+"/users/"+id, body, options)
}

function deleteMember(id) {
    const options = { withCredentials: true }
    return Request.httpDelete(API_URL + "/users/" + id, options)
}