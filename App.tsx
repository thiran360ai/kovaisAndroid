import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
{/* Admin Page */}
import AdminDashboard from './src/Admin/Dashboard';
import GymManagementPage from './src/Admin/Gym';
import HotelAdminPage from './src/Admin/Hotel';
import SpaAdminPage from './src/Admin/Spa';
import SalonAdminPage from './src/Admin/Salon';
import AdminEmployeeData from './src/Admin/EmployeeList';
import TaskModule from './src/Admin/TaskModule';
import EmployeeOrders from './src/Admin/EmployeeOrders';
import EmployeeData from './src/Admin/AdminPanel';
{/* LogIn Page */}
import LoginPage from './src/Authorization/login';
import SignUpPage from './src/Authorization/register';
import ForgotPassword from './src/Authorization/Forget';
{/* GYM Page */}
import GymHome from './src/Gym/HomeGym';
import Order from './src/Gym/Order';
{/* Saloon Page */}
import SalonHome from './src/Saloon/Home'
import DoorstepPage from './src/Saloon/DoorStep';
{/* Spa Page */}
import SpaHome from './src/Spa/SpaHome'
{/* Hotel Page */}
import hotelHomePage from './src/Hotel/Home';
import AccommodatedRoomsScreen from './src/Hotel/AccommodatedRoom';
import BookedRoomsScreen from './src/Hotel/BookedRoom';
import AvailableRoomsScreen from './src/Hotel/AvailableRooms';
import TodaysRevenueScreen from './src/Hotel/TodaysRevenue';
import BookingHistory from './src/Hotel/BookingHistory';
{/* Common Page */}
import AttendanceScreen from './src/components/Attendance';
import HelpPage from './src/components/Help';
import HistoryScreen from './src/components/HistoryScreen';
import OldOrder from './src/components/OldOrder';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* LogIn Page */}
        <Stack.Screen name="LoginPage" component={LoginPage}  options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
        
        {/* Main Page */}
        <Stack.Screen name="Dashboard" component={AdminDashboard} options={{ headerShown: false }}/>
        <Stack.Screen name="SalonHome" component={SalonHome} options={{ headerShown: false }}/>
        <Stack.Screen name="GymHome" component={GymHome} options={{ headerShown: false }}/>
        <Stack.Screen name="SpaHome" component={SpaHome} options={{ headerShown: false }}/>
        <Stack.Screen name="HotelHome" component={hotelHomePage} options={{ headerShown: false }}/>

        {/* Admin Page */}
        <Stack.Screen name="Hotel" component={HotelAdminPage}/>
        <Stack.Screen name="Salon" component={SalonAdminPage} />
        <Stack.Screen name="Spa" component={SpaAdminPage} />
        <Stack.Screen name="Gym" component={GymManagementPage} />
        <Stack.Screen name="AdminEmployeeData" component={AdminEmployeeData} options={{ title: 'Service List' }}/>
        <Stack.Screen name="EmployeeData" component={EmployeeData} options={{ title: 'Employee Data' }}/>
        <Stack.Screen name="EmployeeOrders" component={EmployeeOrders} options={{ title: 'Completed Order' }}/>
        <Stack.Screen name="TaskModule" component={TaskModule} options={{ title: 'Task Management' }}/>

        {/* Hotel Page */}
        <Stack.Screen name="AvailableRooms" component={AvailableRoomsScreen} options={{ title: 'Available Rooms' }}/>
        <Stack.Screen name="Accommodated Rooms" component={AccommodatedRoomsScreen}/>
        <Stack.Screen name="BookedRooms" component={BookedRoomsScreen} options={{ title: 'Booked Rooms' }}/>
        <Stack.Screen name="TodaysRevenue" component={TodaysRevenueScreen} options={{ title: 'Todays Revenue' }}/>
        <Stack.Screen name="BookingHistory" component={BookingHistory} options={{ title: 'Booking History' }}/>

        {/* Saloon Page */}
        <Stack.Screen name="DoorStep" component={DoorstepPage} options={{ title: 'Door Step' }}/>

        {/* GYM Page */}
        <Stack.Screen name="Order" component={Order}/>

        {/* Common Page */}
        <Stack.Screen name="Attendance" component={AttendanceScreen}/>
        <Stack.Screen name="OldOrder" component={OldOrder} options={{ title: 'Old Order' }}/>
        <Stack.Screen name="History" component={HistoryScreen}/>
        <Stack.Screen name="Help" component={HelpPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
