
import { useState } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { LeaveRequestWithName, mockLeaveRequests } from './leaves/types';
import LeaveStatsCards from './leaves/LeaveStatsCards';
import LeaveActions from './leaves/LeaveActions';
import LeaveRequestsTable from './leaves/LeaveRequestsTable';

const LeavesTab = () => {
  const { hasPermission } = usePermissions();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestWithName[]>(mockLeaveRequests);
  
  const canAddLeave = hasPermission('hr.leaves.add');
  const canApproveLeave = hasPermission('hr.leaves.approve');

  const handleApproveLeave = (id: number) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id 
        ? { ...request, status: 'approved', approvedBy: 'Admin' } as LeaveRequestWithName
        : request
    ));
  };

  const handleRejectLeave = (id: number) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id 
        ? { ...request, status: 'rejected' } as LeaveRequestWithName
        : request
    ));
  };

  const pendingRequests = leaveRequests.filter(r => r.status === 'pending');
  const approvedRequests = leaveRequests.filter(r => r.status === 'approved');
  const currentlyAbsent = leaveRequests.filter(r => 
    r.status === 'approved' && 
    new Date(r.startDate) <= new Date() && 
    new Date(r.endDate) >= new Date()
  );

  return (
    <div className="p-6">
      <LeaveStatsCards 
        pendingRequests={pendingRequests}
        approvedRequests={approvedRequests}
        currentlyAbsent={currentlyAbsent}
      />
      
      <LeaveActions 
        canAddLeave={canAddLeave}
        canApproveLeave={canApproveLeave}
        pendingRequestsCount={pendingRequests.length}
      />
      
      <LeaveRequestsTable 
        leaveRequests={leaveRequests}
        canApproveLeave={canApproveLeave}
        onApprove={handleApproveLeave}
        onReject={handleRejectLeave}
      />
    </div>
  );
};

export default LeavesTab;
