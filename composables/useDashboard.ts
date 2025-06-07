export const useDashboard = () => {
  // You can add any dashboard-specific logic here
  const dashboardTitle = ref('Dashboard')
  const dashboardData = ref('Your main content goes here.')

  return {
    dashboardTitle,
    dashboardData
  }
}
