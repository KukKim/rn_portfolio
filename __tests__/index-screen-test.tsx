import { render } from "@testing-library/react-native";

import IndexScreen from "@/app/index";

describe("<HomeScreen />", () => {
  test("Text renders correctly on IndexScreen", () => {
    const { getByText } = render(<IndexScreen />);

    getByText("Login");
  });
});
