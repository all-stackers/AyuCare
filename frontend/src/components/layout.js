import Navbar from "./navbar"

const Layout = ({ children }) => (
    <div className="flex flex-col">
        <Navbar />
        <div className="w-full h-[calc(100vh-60px)] flex-grow box-border">
            {children}
        </div>
    </div>
)

export default Layout