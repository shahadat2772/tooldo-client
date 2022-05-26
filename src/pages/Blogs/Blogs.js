import React from "react";

const Blogs = () => {
  return (
    <div className="max-w-[650px] mx-auto">
      <div className="que1">
        <h2 className="text-xl">
          # To improve the performance of a React Application:
        </h2>
        <p className="mt-3">
          1. We can use useMemo() hook to prevent running a bulky function for
          the same parameter. This allows us to store a function's output so
          that the function will not run for the same parameter again.
        </p>
        <p className="mt-3">
          2. By virtualizing a long list of data, means we will render a small
          portion of the datasets at a time (visible viewport of a browser)
          instead of rendering the hole whole page. To achieve this we can use
          react library like react-window.
        </p>
        <p className="mt-3">
          3. React.PureComponent can be use to reduce the rerender count, this
          component only rerenders if there is any change on state or props.
        </p>
        <p className="mt-3">
          4. Using React.memo() we can cache a functional component so the it
          dose not rerender if there is no change on props, state.
        </p>
        <p className="mt-3">
          5. We can use webworker, to so it can make a hand for javascript in
          background without effecting the UI flow.
        </p>
      </div>
      <div className="que2 mt-4">
        <h2 className="text-xl">
          # Different ways to manage a state in a React application:
        </h2>
        <h2>
          Different types of states are there to manage like: #Local state,
          #Global state, #Server state, #URL state
        </h2>
        <li className="mt-3">
          Usually local states are managed in react using the useState() hook.
          It can take any valid data value, including primitive and object
          values. We can pass it's setter function to another component so that
          the value of this state can be get and set form anywhere.
        </li>
        <li className="mt-3">
          Global states are states we manage across multiple components. Means
          we want to get updated data form state in multiple components. We
          manage this state with help of context api.Also Zustand, Jotai, and
          Recoil can be manage global states.
        </li>
        <li className="mt-3">
          Server state is where we keep the data that came form an external
          server. Basically we manage this state with useState()[To keep the
          fetched data] and useEffect()[to fetch the data on dependencies]. But
          we can also use the library like React Query, SWR.
        </li>
        <li className="mt-3">
          URL state stores the states that is being used in our application for
          url parameters like id, email, name, pathname etc. With the help of
          react router we can manage the state using useHistory() or
          useLocation().
        </li>
      </div>
    </div>
  );
};

export default Blogs;
