import React, { Suspense, useEffect, useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import MemberTable from './components/MemberTable'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineCalendar, HiArrowLeft } from 'react-icons/hi'
import dayjs from 'dayjs'
import MemberTableTools from './components/MemberTableTools'
import AddUserDialog from './components/AddUserDialog'
import { useDispatch } from 'react-redux'
import { getTeamDetails } from './store/dataSlice'
import { Tabs } from 'components/ui'
import TabList from 'components/ui/Tabs/TabList'
import TabNav from 'components/ui/Tabs/TabNav'
import { Button } from 'components/ui'
import TeamAccountList from '../../TeamAccounts/AccountList'

injectReducer('memberList', reducer)
injectReducer('availableUserDropdownList', reducer)

const tabMenu = {
    members: { label: 'Member', path: 'member' },
    accounts: { label: 'Account', path: 'account' },
}

const MemberList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [currentTab, setCurrentTab] = useState('members')

    const [teamDetails, setTeamDetails] = useState({})
    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )
    const id = location.pathname.split('/')[2]

    const onTabChange = (val) => {
        setCurrentTab(val)
        navigate(`/teams/${id}/${val}`)
    }

    useEffect(() => {
        setCurrentTab(path)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchTeamData = (id) => {
        dispatch(getTeamDetails(id)).then((response) => {
            setTeamDetails(response?.payload?.data)
        })
    }

    useEffect(() => {
        if (!id) return
        fetchTeamData(id)
    }, [id])

    return (
        <>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <Link className="block lg:inline-block mb-4" to="/teams">
                    <Button
                        variant=""
                        size="sm"
                        icon={<HiArrowLeft />}
                    ></Button>
                </Link>
                <h3 className="mb-4 lg:mb-1">{teamDetails?.name}</h3>
                <span className="flex items-center mb-4 ">
                    <HiOutlineCalendar className="text-lg" />
                    <span className="ltr:ml-1 rtl:mr-1">
                        {dayjs(teamDetails?.createdAt)
                            .locale('en')
                            .format('ddd DD-MMM-YYYY, hh:mm A')}
                    </span>
                </span>
                <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
                    <TabList>
                        {Object.keys(tabMenu).map((key) => (
                            <TabNav key={key} value={key}>
                                {tabMenu[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <>
                    <div className="px-4 py-6">
                        <Suspense fallback={<></>}>
                            {currentTab === 'members' && (
                                <>
                                    <div className="lg:flex items-center justify-end mb-4 mt-2">
                                        <MemberTableTools />
                                    </div>

                                    <div className="xl:flex gap-4 mt-2">
                                        <div className="w-full">
                                            <MemberTable id={id} />
                                        </div>
                                    </div>
                                </>
                            )}
                            {currentTab === 'accounts' && <TeamAccountList />}
                        </Suspense>
                    </div>
                </>
            </AdaptableCard>
            <AddUserDialog />
        </>
    )
}

export default MemberList
