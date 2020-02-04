import { takeEvery, call, put } from 'redux-saga/effects'
import { FETCH_EQUIPMENTS_REQUEST } from '../constants/action-types'
import { BASE_URL } from '../constants/config'
import * as Request from '../util/request'
import { fetchEquipmentsSuccess, fetchEquipmentsFailure } from '../actions/action'

export function* watchEquipments() {
    yield takeEvery(FETCH_EQUIPMENTS_REQUEST, fetchEquipments)
}

function* fetchEquipments() {
    try {
        const payload = yield call(getEquipments)
        yield put(fetchEquipmentsSuccess(payload))
    } catch (e) {
        yield put(fetchEquipmentsFailure(e))
    }
}

function getEquipments() {
    return Request.get(BASE_URL + "/equipments")
}