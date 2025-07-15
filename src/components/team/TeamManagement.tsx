
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Settings } from 'lucide-react';

interface TeamManagementProps {
  teamData: any;
  loading: boolean;
}

export const TeamManagement: React.FC<TeamManagementProps> = ({ 
  teamData, 
  loading 
}) => {
  // Mock team data
  const mockTeam = [
    { id: 1, name: 'John Admin', role: 'Admin', status: 'active', email: 'jo***@example.com' },
    { id: 2, name: 'Jane Sales', role: 'Salesperson', status: 'active', email: 'ja***@example.com' },
  ];

  const team = teamData || mockTeam;

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-green-800 flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-green-600" />
            Team Management
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white text-xs p-2">
            <UserPlus className="h-3 w-3" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {team.map((member: any, index: number) => (
            <div key={member.id || index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">
                  {member.name}
                </p>
                <p className="text-xs text-green-600">
                  {member.role} • {member.email}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  member.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {member.status}
                </span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-green-200">
          <div className="grid grid-cols-2 gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
              Add Admin
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
              Add Salesperson
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
