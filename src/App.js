import Form from "./components/form";
import useForm from "./hooks/useForm";

const App = () => {
  const hook = useForm();
  return (
      <Form {...hook} />
  )
};

export default App;
