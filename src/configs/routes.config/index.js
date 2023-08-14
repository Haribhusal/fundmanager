import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        // component: React.lazy(() => import('views/Home')),
        component: React.lazy(() => import('views/dashboard')),

        authority: [],
    },
    // {
    //     key: 'dashboard',
    //     path: '/dashboard',
    //     component: React.lazy(() => import('views/dashboard')),
    //     authority: [],
    // },
    {
        key: 'appsDefi.dashboard',
        path: `/defi/dashboard`,
        component: React.lazy(() => import('views/defi/dashboard')),
        authority: [],
    },
    {
        key: 'appsDefi.accounts',
        path: `/defi/accounts`,
        component: React.lazy(() => import('views/defi/accounts/AccountList')),
        authority: [],
    },
    {
        key: 'appsDefi.transactions',
        path: `/defi/transactions`,
        component: React.lazy(() =>
            import('views/defi/transactions/TransactionList')
        ),
        authority: [],
    },
    {
        key: 'appsDefi.protocols',
        path: `/defi/protocols`,
        component: React.lazy(() =>
            import('views/defi/protocols/ProtocolList')
        ),
        authority: [],
    },
    {
        key: 'appsDefi.balances',
        path: `/defi/balances`,
        component: React.lazy(() => import('views/defi/balances/BalancesList')),
        authority: [],
    },
    {
        key: 'appsDefi.accountNew',
        path: `/defi/account-new`,
        component: React.lazy(() => import('views/defi/accounts/AccountNew')),
        authority: [],
        meta: {
            header: 'Add New Account',
        },
    },

    {
        key: 'appsExchanges.exchanges',
        path: `/exchanges/exchanges`,
        component: React.lazy(() => import('views/exchanges/exchanges/ExchangesList')),
        authority: [],
        meta: {
            header: '',
        },
    },
    {
        key: 'appsExchanges.exchanges.new',
        path: `/exchanges/new`,
        component: React.lazy(() => import('views/exchanges/exchanges/NewExchange')),
        authority: [],
        meta: {
            header: 'Add New Exchange',
        },
    },
    {
        key: 'newStandardUser',
        path: `/new-standard-user`,
        component: React.lazy(() =>
            import('views/teams/standardUser/NewStandardUser')
        ),
        authority: [],
        meta: {
            header: 'Add New User',
        },
    },
    {
        key: 'standardUsers.list',
        path: `/standard-users`,
        component: React.lazy(() =>
            import('views/teams/standardUser/StandardUserList')
        ),
        authority: [],
        meta: {
            header: '',
        },
    },

    {
        key: 'team.list',
        path: `/new-team`,
        component: React.lazy(() =>
            import('views/teams/team/NewTeam')
        ),
        authority: [],
        meta: {
            header: 'Add New Team',
        },
    },

    {
        key: 'team.list',
        path: `/teams`,
        component: React.lazy(() => import('views/teams/team/TeamList')),
        authority: [],
        meta: {
            header: '',
        },
    },
    {
        key: 'members',
        path: `/teams/:id/:name`,
        component: React.lazy(() =>
            import('views/teams/team/TeamMembers/MemberList')
        ),
        authority: [],
        meta: {
            header: '',
        },
    },
    {
        key: 'projects',
        path: '/projects',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'appSettings.accounts',
        path: `/settings/:tab`,
        component: React.lazy(() => import('views/settings/account/Settings')),
        authority: [],
        meta: {
            header: 'Settings',
            headerContainer: true,
        },
    },
    {
        key: 'appSettings.contacts',
        path: '/settings/contacts',
        component: React.lazy(() =>
            import('views/settings/contacts/ContactList')
        ),
        authority: [],
    },
    {
        key: 'appSettings.contactsNew',
        path: '/settings/contacts-new',
        component: React.lazy(() =>
            import('views/settings/contacts/ContactNew')
        ),
        authority: [],
        meta: {
            header: 'Add New Contact',
        },
    },
    {
        key: 'appSettings.contracts',
        path: '/settings/contracts',
        component: React.lazy(() =>
            import('views/settings/contracts/ContractList')
        ),
        authority: [],
    },
    {
        key: 'appSettings.contractsNew',
        path: `/settings/contracts-new`,
        component: React.lazy(() =>
            import('views/settings/contracts/ContractNew')
        ),
        authority: [],
        meta: {
            header: 'Add New Contract',
        },
    },
    {
        key: 'snapshots',
        path: '/snapshots',
        component: React.lazy(() => import('views/snapshots/SnapshotList')),
        authority: [],
    },

    /** Example purpose only, please remove */
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: React.lazy(() =>
            import('views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
]
