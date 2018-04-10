/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

import faker from "faker/locale/en_GB";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { noop } from "lodash";

global.console.warn = noop;
global.console.error = noop;

Enzyme.configure({ adapter: new Adapter() });

jest.mock("./lib/page/pageData");
jest.mock("react-relay");
jest.mock("next/router");
jest.mock("browser-cookies");
jest.mock("isomorphic-fetch");

faker.seed(123);
