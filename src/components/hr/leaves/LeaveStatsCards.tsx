
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, BadgeCheck, CalendarOff } from 'lucide-react';
import { LeaveRequestWithName } from './types';

interface LeaveStatsCardsProps {
  pendingRequests: LeaveRequestWithName[];
  approvedRequests: LeaveRequestWithName[];
  currentlyAbsent: LeaveRequestWithName[];
}

const LeaveStatsCards = ({ pendingRequests, approvedRequests, currentlyAbsent }: LeaveStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
            Demandes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{pendingRequests.length}</div>
          <p className="text-sm text-muted-foreground">Demandes en attente</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BadgeCheck className="mr-2 h-5 w-5 text-primary" />
            Approuvées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{approvedRequests.length}</div>
          <p className="text-sm text-muted-foreground">Ce trimestre</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CalendarOff className="mr-2 h-5 w-5 text-primary" />
            Absences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{currentlyAbsent.length}</div>
          <p className="text-sm text-muted-foreground">Actuellement absents</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveStatsCards;
