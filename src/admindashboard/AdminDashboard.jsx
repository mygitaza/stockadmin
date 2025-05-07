import React from 'react'
import './AdminDashboard.css'
import Navbar from '../components/Navbar/Navbar'
import { useDeleteUserMutation, useFetchUsersQuery } from '../redux/feature/user/userApi'
import { useApproveStockMutation, useGetAllStockUnitsQuery } from '../redux/feature/stock/stockApi'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { updateStockStatus } from '../redux/feature/slice/stockSlice'
 
 
const AdminDashboard = () => {
    const dispatch = useDispatch()
    const {data: users =[], isLoading: loadingUsers} = useFetchUsersQuery();
    const { data: stocks = [], error: stockError } = useGetAllStockUnitsQuery();
    const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
    const [approveStock, { isLoading: approving }] = useApproveStockMutation();


      const handleDelete = useCallback(async (id) => {
        try {
          await deleteUser(id).unwrap();
          alert('User deleted successfully');
        } catch (error) {
          console.error('Failed to delete user:', error);
          alert('User deletion failed.');
        }
      }, [deleteUser]);

    // Group stocks by user
  const userStockMap = {};
  stocks.forEach((stock) => {
    if (!userStockMap[stock.userId]) userStockMap[stock.userId] = [];
    userStockMap[stock.userId].push(stock);
  });

  return (
    <>
    <Navbar/>
    <table className='admin-table'>
        <thead className='admin-thead'>
            <tr className="thead-roll">
                <th>S/N:</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Units</th>
                <th>Payment</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody className='admin-tbody'>
        {!loadingUsers && users.length > 0 ? (
            users
            .filter(user => user.role !== 'admin') // ✅ Only show non-admin users
            .map((user, index) => {
              const userStocks = userStockMap[user._id] || [];
              const totalUnits = userStocks.reduce((acc, stock) => acc + (stock.units || 0), 0);
              const pendingStock = userStocks.find((stock) => stock.status !== 'Approved');

              return (
                <tr key={user._id} className='tbody-roll-section'>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{totalUnits.toFixed(2)}</td>
                  <td>
                  {userStocks.length > 0 ? (
    userStocks.map((stock) => (
      <div key={stock._id}>
        <select
          value={stock.status}
          disabled={stock.status === 'Approved' || approving}
          onChange={async (e) => {
            if (e.target.value === 'Approved') {
              try {
                await approveStock({
                  userId: stock.userId,
                  stockId: stock.stockId
                }).unwrap();
                dispatch(updateStockStatus({ stockId: stock.stockId, status: 'Approved' }));
                alert('Stock status updated to Approved');
              } catch (error) {
                console.error('Failed to approve stock:', error);
                alert('Stock approval failed.');
              }
            }
          }}
        >
          <option value="Processing">Processing</option>
          <option value="Approved">Approved</option>
        </select>
      </div>
    ))
  ) : (
    'No Stock'
  )}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(user._id)} className="delete-btn">
                      X
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
                {loadingUsers ? 'Loading users...' : 'No users found'}
              </td>
            </tr>
          )}
        </tbody>
    </table>
    </>
  )
}

export default AdminDashboard