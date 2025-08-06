import React, { useMemo, useState } from 'react';
import {
    Calendar,
    dateFnsLocalizer,
    Views,
} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import vi from 'date-fns/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './WeeklyCalendarView.css';

const locales = { vi };

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

const WeeklyCalendarView = ({ events }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState(Views.WEEK);

    const formattedEvents = useMemo(() =>
        events.map(e => ({
            title: e.title,
            start: new Date(`${e.date}T${e.startTime}`),
            end: new Date(`${e.date}T${e.endTime}`),
        })), [events]
    );

    return (
        <div className="google-calendar-wrapper">
            <div className="google-calendar-style">
                <Calendar
                    localizer={localizer}
                    events={formattedEvents}
                    date={currentDate}
                    view={view}
                    onNavigate={(date) => setCurrentDate(date)}
                    onView={(v) => setView(v)}
                    views={['day', 'week', 'month', 'agenda']}
                    step={30}
                    timeslots={2}
                    style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '10px',
                    }}
                    messages={{
                        week: 'Tuần',
                        day: 'Ngày',
                        month: 'Tháng',
                        agenda: 'Danh sách',
                        today: 'Hôm nay',
                        previous: 'Trước',
                        next: 'Sau',
                    }}
                />
            </div>
        </div>
    );
};

export default WeeklyCalendarView;
