import Heading from "@/components/Heading";
import DateTimeComponent from "@/components/Timer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Package, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { calculateOverallAmount, calculateTotalAmount } from "@/lib/actions/account.actions";
import { countAllUsers, countUsersWithCarStatus, countUsersWithPayed, countUsersWithUnpaid } from "@/lib/actions/member.actions";
import { currentProfile } from "@/lib/helpers/current-profile";
import { notFound } from "next/navigation";
import { interest } from "@/lib/helpers/interest";
import { losses } from "@/lib/helpers/losses";


const page = async () => {
  const profile = await currentProfile();

  if (!profile) {notFound()}
  // All members registered in the application 
  const allUsers = await countAllUsers();

  // Members who requested to join the car
  const joinCar = await countUsersWithCarStatus();

  // Members who have successfully pay their fare
  const payedMember = await countUsersWithPayed();

  // Members who payment not yet successful
  const unpaidMember = await countUsersWithUnpaid();

  // Money that we have. money at hand
  const atHand = await calculateTotalAmount();

  // overall money to be collected , atHand * joincar
  const overallMoney = await calculateOverallAmount();

  // any profit
  const profit = await interest();

  // any losses
  const lost  = await losses();

  return (
    <div className="max-w-7xl px-2 mx-auto py-4">
      <div className="flex justify-between items-center">
        <Heading title="Dashboard" description="Overview of the transport management" />
        {/* <ReportIssue /> */}
      </div>
      <Separator />
      <div className="py-4 flex justify-between items-center px-4">
        <div className="flex items-center gap-5">
          <Link href="/dashboard/actions" className={cn(buttonVariants())}>Actions</Link>
        </div>
        <DateTimeComponent />
      </div>
      <Separator />
      <div className="mx-auto pb-4">
        <h1 className="font-bold py-2 text-xl text-white/80 ">Member</h1>
        <div className="flex flex-1 gap-4  overflow-x-auto">
          <Card className="flex flex-col flex-0 w-full  bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-5 w-5 font-bold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allUsers ? allUsers : 0}</div>
            </CardContent>
          </Card>
          <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transport Members
              </CardTitle>
              <Users className="h-5 w-5 font-bold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{joinCar ? joinCar : 0}</div>
            </CardContent>
          </Card>
          <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Paid Members
              </CardTitle>
              <Users className="h-5 w-5 font-bold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{payedMember ? payedMember : 0}</div>
            </CardContent>
          </Card>
          <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unpaid Members
              </CardTitle>
              <Users className="h-5 w-5 font-bold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unpaidMember ? unpaidMember : 0}</div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator />
      <div className="mx-auto pb-4">
        <h1 className="font-bold py-2 text-xl text-white/80 ">Accounts</h1>
        <div className="flex flex-1 gap-4  overflow-x-auto">
          <Card className="flex flex-col flex-0 w-full  bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Money</CardTitle>
              <DollarSign className="h-5 w-5 font-bold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallMoney ? overallMoney : 0}</div>
            </CardContent>
          </Card>
          <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                At Hand
              </CardTitle>
              <DollarSign className="h-5 w-5 font-bold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{atHand ? atHand : 0}</div>
            </CardContent>
          </Card>
          <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Interests
              </CardTitle>
              <DollarSign className="h-5 w-5 font-bold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profit ? profit : 0}</div>
            </CardContent>
          </Card>
          <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Losses
              </CardTitle>
              <DollarSign className="h-5 w-5 font-bold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lost ? lost : 0}</div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  )
}

export default page
