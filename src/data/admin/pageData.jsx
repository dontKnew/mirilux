const { Home, BarChart3, Users,MessageSquareCode } = require("lucide-react");

const pageData = [
    { name: "Dashboard", icon: Home, href: "/admin" },
    { name: "Orders", icon: BarChart3, href: "/admin/orders" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Enquiries", icon: MessageSquareCode, href: "/admin/enquiries" },
];

export {pageData}