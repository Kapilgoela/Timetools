import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home/page'));
const AgeCalculatorPage = lazy(() => import('../pages/age-calculator/page'));
const DateCalculatorPage = lazy(() => import('../pages/date-calculator/page'));
const CountdownTimerPage = lazy(() => import('../pages/countdown-timer/page'));
const WorldClockPage = lazy(() => import('../pages/world-clock/page'));
const TimezoneConverterPage = lazy(() => import('../pages/timezone-converter/page'));
const AddSubtractDaysPage = lazy(() => import('../pages/add-subtract-days/page'));
const FutureDatePage = lazy(() => import('../pages/future-date/page'));
const WorkingDaysPage = lazy(() => import('../pages/working-days/page'));
const StopwatchPage = lazy(() => import('../pages/stopwatch/page'));
const DurationCalculatorPage = lazy(() => import('../pages/duration-calculator/page'));
const UnixTimestampPage = lazy(() => import('../pages/unix-timestamp/page'));
const BirthdayCountdownPage = lazy(() => import('../pages/birthday-countdown/page'));
const BlogPage = lazy(() => import('../pages/blog/page'));
const BlogArticlePage = lazy(() => import('../pages/blog/article/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/age-calculator',
    element: <AgeCalculatorPage />
  },
  {
    path: '/date-calculator',
    element: <DateCalculatorPage />
  },
  {
    path: '/add-subtract-days',
    element: <AddSubtractDaysPage />
  },
  {
    path: '/future-date',
    element: <FutureDatePage />
  },
  {
    path: '/working-days',
    element: <WorkingDaysPage />
  },
  {
    path: '/countdown-timer',
    element: <CountdownTimerPage />
  },
  {
    path: '/stopwatch',
    element: <StopwatchPage />
  },
  {
    path: '/duration-calculator',
    element: <DurationCalculatorPage />
  },
  {
    path: '/world-clock',
    element: <WorldClockPage />
  },
  {
    path: '/timezone-converter',
    element: <TimezoneConverterPage />
  },
  {
    path: '/unix-timestamp',
    element: <UnixTimestampPage />
  },
  {
    path: '/birthday-countdown',
    element: <BirthdayCountdownPage />
  },
  {
    path: '/blog',
    element: <BlogPage />
  },
  {
    path: '/blog/:slug',
    element: <BlogArticlePage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export default routes;