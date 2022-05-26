import React from "react";

const Blogs = () => {
  return (
    <div className="px-4 max-w-[650px] mx-auto mt-6">
      {/* Que-1 */}
      <div className="que1 pb-4">
        <h2 style={{ fontFamily: "Oswald" }} className="text-xl">
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
      {/* Que-2 */}
      <div className="que2 mt-4 pb-4">
        <h2 style={{ fontFamily: "Oswald" }} className="text-xl">
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
          Global states are states we manage across multiple components. We
          manage this state with help of context api.Also Zustand, Jotai, and
          Recoil can be manage global states.
        </li>
        <li className="mt-3">
          Basically we manage server state state with useState()[To keep the
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
      {/* Que-3 */}
      <div style={{ fontFamily: "Oswald" }} className="que3 mt-4 pb-4">
        <h2 className="text-xl"># Search from an array of products by name:</h2>
        <code>
          {` const products = [`}
          <br />
          {` { name: "Tometo",price: 20,description: "Usually tomemto looks red",  },`}
          <br />
          {` { name: "Borboti",price: "Borboti and noodles are awesome together",},`}
          <br />
          {` { name: "Bangladesh is wellknown for it's kumra beguni",  },`}
          <br />
          {`];`}
          <br />
        </code>

        <code>
          {` const searchFor = (searchingText) => {`}
          <br />
          {`const result = [];`}
          <br />
          {`   for (const product of products) {`}
          <br />
          {` if (`}
          <br />
          {`) {`}
          <br />
          {`result.push(product);`}
          <br />
          {`}}`}
          <br />
          {`return result;`}
          <br />
          {`};`}
          <br />
          {`console.log(searchFor("kumra"));`}
          <br />
        </code>
      </div>
      {/* Que-4 */}
      <div className="que4 mt-4 pb-4">
        <h2 style={{ fontFamily: "Oswald" }} className="text-xl">
          # Why to set a state using it's setter function:
        </h2>
        <div>
          <p>
            As we use a state in our application in multiple places. Each time a
            state changes reacts dif algorithm rerenders the components
            according to the state. This only happens when we use the setter
            function to set the state. If we do not use the setter function to
            set that state react will not be able to change the state for all
            the components that the state used in.
          </p>
        </div>
      </div>
      {/* Que-5 */}
      <div className="que4 mt-5">
        <h2 style={{ fontFamily: "Oswald" }} className="text-xl">
          # What is a unit test? Why should write unit tests?
        </h2>
        <div>
          <i>
            Unit test is a testing of the smallest testable parts of an
            application.
          </i>
          <div className="mt-3">
            <li>Debugging processes gets a bit easier.</li>
            <li>Helps to stay focused and to create a much better design.</li>
            <li>Through this we can identify the problems earlier.</li>
            <li>
              It's helps a developer to think about the design and flow before
              starting to code.
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
