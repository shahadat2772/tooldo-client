import React from "react";
import { Link } from "react-router-dom";

const MyPortfolio = () => {
  return (
    <div className="mt-8">
      <div className="portfolioContainer w-[330px] md:w-[700px] mx-auto">
        <h2 style={{ fontFamily: "Oswald" }} className="text-2xl text-center">
          WELCOME TO MY PORTFOLIO
        </h2>
        <div className="info text-info mt-8">
          <p className="py-[10px]">Name: Shahadat Hossain</p>
          <hr />
          <p className="py-[10px]">Email: shahadat2772@gmail.com</p>
          <hr />
          <p className="py-[10px]">Education:</p>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th></th>
                  <th>Exam Name</th>
                  <th>BOARD</th>
                  <th>YEAR</th>
                  <th>SUB</th>
                  <th>RESULT</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                <tr>
                  <th>1</th>
                  <td>SSC</td>
                  <td>Dhaka(technical)</td>
                  <td>2018-2020</td>
                  <td>Science</td>
                  <td>5.00</td>
                </tr>
                {/* <!-- row 2 --> */}
                <tr>
                  <th>2</th>
                  <td>JSC</td>
                  <td>Dhaka</td>
                  <td>2017-2018</td>
                  <td></td>
                  <td>4.07</td>
                </tr>
                {/* <!-- row 3 --> */}
                <tr>
                  <th>3</th>
                  <td>PSC</td>
                  <td>Dhaka</td>
                  <td>2014-2015</td>
                  <td></td>
                  <td>4.57</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <p className="py-[10px] ">Web development skills:</p>
          <div className="WebSkills  flex mb-4 list-none gap-2 flex-wrap">
            <li>#CSS</li>
            <li>#HTML</li>
            <li>#EXPRESS</li>
            <li>#REACT</li>
            <li>#JAVASCRIPT</li>
          </div>
          <hr />
          <p className="py-[10px] ">Three of my projects with live links:</p>
          <div className="WebSkills flex-col flex mb-4  gap-2 flex-wrap">
            <li>
              <a
                className="text-secondary"
                href="https://tooldo-658e2.web.app/"
              >
                Tooldo
              </a>
            </li>
            <li>
              <a
                className="text-secondary"
                href="https://speedo-eb970.web.app/"
              >
                Speedo
              </a>
            </li>
            <li>
              <a
                className="text-secondary"
                href="https://dentaid-bc9ec.web.app/"
              >
                DentAid
              </a>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPortfolio;
