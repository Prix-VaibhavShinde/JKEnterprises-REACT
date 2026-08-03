import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const AppSidebar = () => {
  const { state, setOpen, isMobile } = useSidebar();
  const handleSidebarClick = () => {
    if (state === "collapsed" && !isMobile) {
      setOpen(true);
    }
  };
  return (
    <Sidebar
      collapsible="icon"
      onClick={handleSidebarClick}
      className={state === "collapsed" ? "cursor-pointer" : ""}
    >
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  );
};

export default AppSidebar;
