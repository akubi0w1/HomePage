import React from 'react'
import { connect } from 'react-redux'
import { fetchEquipmentsRequest, deleteEquipmentRequest } from '../../../../actions/action'
import BreadCrumb from '../../../common/Breadcrumb'
import AdminList from '../AdminList'

const mapStateToProps = (state) => {
    return {
        equipments: state.equipments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRequest: () => dispatch(fetchEquipmentsRequest()),
        deleteRequest: (id) => dispatch(deleteEquipmentRequest({ id }))
    }
}

class ConnectedEquipmentList extends React.Component {
    render() {
        return (
            <div className="content">
                <BreadCrumb items={[{ path: "/", label: "管理者サイト" }, { path: "/equipments", label: "研究室備品" }]} />
                <AdminList
                    items={this.props.equipments}
                    caption={"研究室備品"}
                    path={"equipments"}
                    fetchRequest={this.props.fetchRequest}
                    deleteRequest={this.props.deleteRequest} />
            </div>
        )
    }
}

const AdminEquipmentList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedEquipmentList)

export default AdminEquipmentList