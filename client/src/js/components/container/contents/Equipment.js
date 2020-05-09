import React from 'react'
import { connect } from 'react-redux'
import { fetchEquipmentsRequest } from '../../../actions/action'
import { APIErrorList } from '../../common/APIError'

const mapDispatchToProps = dispatch => {
    return {
        fetchRequest: () => dispatch(fetchEquipmentsRequest())
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        equipments: state.equipments,
        apiError: state.apiError
    }
}

class ConnectedEquipment extends React.Component {
    componentDidMount() {
        this.props.fetchRequest()
    }

    render() {
        return (
            <div className="content">
                <h1 className="content-title h1-block">備品</h1>
                <APIErrorList 
                    apiError={this.props.apiError}/>
                <EquipmentTable equipments={this.props.equipments} />
            </div>
        )
    }
}

/*
EquipmentTable 備品表示
props:
    equipments = 備品のデータセット
*/
const EquipmentTable = (props) => {
    return (
        <table className="table-stripe">
            <thead>
                <tr>
                    <th>備品名</th>
                    <th>数量</th>
                    <th>備考</th>
                    <th>タグ</th>
                    {/* <th>購入日</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    props.equipments.map((equ) => (
                        <EquipmentRow key={equ.id} equipment={equ} />
                    ))
                }
            </tbody>
        </table>
    )
}

/*
EquipmentRow 備品一件
props:
    equipment = 備品一件分
*/
const EquipmentRow = (props) => {
    return (
        <tr>
            <td>{props.equipment.name}</td>
            <td>{props.equipment.stock}</td>
            <td>{props.equipment.note}</td>
            <td>{props.equipment.tag.name}</td>
            {/* <td>{props.equipment.}</td> */}
        </tr>
    )
}

const Equipment = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedEquipment)

export default Equipment