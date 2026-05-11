import React from 'react';
import { CardContent, Typography, Chip, Box, Paper } from '@mui/material';
import { Notification } from '../utils/priorityLogic';

interface Props {
    notification: Notification;
    isRead: boolean;
    onClick: () => void;
}

const TYPE_COLORS: Record<string, string> = {
    Placement: '#f44336', // Red
    Result: '#ff9800',    // Orange
    Event: '#2196f3',     // Blue
};

export const NotificationCard = ({ notification, isRead, onClick }: Props) => {
    // Fallback color if type is missing
    const badgeColor = TYPE_COLORS[notification.Type] || '#757575';

    const formattedTime = new Date(notification.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return React.createElement(
        Paper,
        {
            elevation: isRead ? 0 : 3,
            onClick,
            sx: {
                mb: 2,
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                borderLeft: `6px solid ${badgeColor}`,
                backgroundColor: isRead ? '#fcfcfc' : '#ffffff',
                opacity: isRead ? 0.7 : 1,
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 6,
                },
            },
        },
        React.createElement(
            CardContent,
            { sx: { py: 2, '&:last-child': { pb: 2 } } },
            React.createElement(
                Box,
                { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
                React.createElement(
                    Box,
                    null,
                    React.createElement(Chip, {
                        label: notification.Type,
                        size: 'small',
                        sx: {
                            backgroundColor: badgeColor,
                            color: '#fff',
                            fontWeight: 'bold',
                            mb: 1,
                        },
                    }),
                    React.createElement(
                        Typography,
                        { variant: 'body1', sx: { fontWeight: isRead ? 500 : 700, color: '#333' } },
                        notification.Message
                    )
                ),
                React.createElement(
                    Typography,
                    { variant: 'caption', sx: { color: 'text.secondary', whiteSpace: 'nowrap', ml: 2 } },
                    formattedTime
                )
            )
        )
    );
};