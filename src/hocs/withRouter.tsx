import { useLocation, useNavigate } from "react-router-dom";

const withRouter = (Component: any) => (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Component navigate={navigate} location={location} {...props}></Component>
  );
};

export default withRouter;
