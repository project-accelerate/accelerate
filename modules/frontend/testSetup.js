/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

import faker from "faker/locale/en_GB";

jest.mock("./lib/withData");
jest.mock("react-relay");

faker.seed(123);
