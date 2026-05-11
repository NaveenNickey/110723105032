import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, GlobalStyles, Paper, CircularProgress } from '@mui/material';
import { fetchNotifications, getAuthToken } from './services/api';
import { Notification, getPriorityNotifications } from './utils/priorityLogic';
import { Log } from '../../logging-middleware';

const NotificationCard = ({
    notification,
    isRead,
    onClick
}: {
    notification: Notification;
    isRead: boolean;
    onClick: () => void;
}) => React.createElement(
    Paper,
    {
        elevation: 3,
        sx: {
            p: 2,
            mb: 2,
            backgroundColor: isRead ? '#e8f0fe' : '#ffffff',
            cursor: 'pointer',
            border: isRead ? '1px solid #90caf9' : '1px solid #e0e0e0'
        },
        onClick
    },
    React.createElement(
        Typography,
        { variant: 'subtitle1', sx: { fontWeight: 700, mb: 1 } },
        notification.id
    ),
    React.createElement(
        Typography,
        { variant: 'body2', sx: { color: 'text.secondary' } },
        JSON.stringify(notification)
    )
);

const App = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const [readIds, setReadIds] = useState<string[]>(() => {
        const saved = localStorage.getItem('read_notifications');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const initApp = async () => {
            const accessToken = await getAuthToken();
            if (accessToken) {
                try {
                    const data = await fetchNotifications(accessToken);
                    setNotifications(data);
                    await Log("frontend", "info", "AppRoot", "Notifications fetched", accessToken);
                } catch (err) {
                    console.error(err);
                }
            }
            setLoading(false);
        };
        initApp();
    }, []);

    const handleMarkAsRead = (id: string) => {
        if (!readIds.includes(id)) {
            const newReadIds = [...readIds, id];
            setReadIds(newReadIds);
            localStorage.setItem('read_notifications', JSON.stringify(newReadIds));
        }
    };

    const displayData = tabValue === 0 
        ? notifications 
        : getPriorityNotifications(notifications, 10);

    if (loading) return React.createElement(
        Box,
        { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
        React.createElement(CircularProgress, null)
    );

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(GlobalStyles, { styles: { body: { backgroundColor: '#f4f6f8', margin: 0, padding: 0 } } }),
        React.createElement(
            Container,
            { maxWidth: 'sm', sx: { py: 6 } },
            React.createElement(
                Box,
                { sx: { textAlign: 'center', mb: 4 } },
                React.createElement(
                    Typography,
                    { variant: 'h3', sx: { fontWeight: 800, color: '#1a237e', letterSpacing: -1 } },
                    'Campus'
                ),
                React.createElement(
                    Typography,
                    { variant: 'h6', sx: { color: 'text.secondary', mt: -1 } },
                    'Notification Center'
                )
            ),
            React.createElement(
                Paper,
                { sx: { borderRadius: 4, mb: 4, overflow: 'hidden' } },
                React.createElement(
                    Tabs,
                    {
                        value: tabValue,
                        onChange: (_, val) => setTabValue(val),
                        variant: 'fullWidth',
                        indicatorColor: 'primary',
                        textColor: 'primary'
                    },
                    React.createElement(Tab, { label: 'Recent', sx: { fontWeight: 'bold' } }),
                    React.createElement(Tab, { label: 'Priority', sx: { fontWeight: 'bold' } })
                )
            ),
            React.createElement(
                Box,
                null,
                displayData.map((n) => React.createElement(NotificationCard,
                    {
                        key: n.id,
                        notification: n,
                        isRead: readIds.includes(n.id),
                        onClick: () => handleMarkAsRead(n.id)
                    }
                ))
            )
        )
    );
};

export default App;