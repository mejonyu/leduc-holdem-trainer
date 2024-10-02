import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import LogInModal from "../AuthModal/LogInModal";
import { useAuth } from "@/hooks/useAuth";
import { triggerButtonHapticFeedback } from "@/utils/haptics";
import { startShake } from "@/utils/animations";

// Mock the dependencies
jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/utils/haptics", () => ({
  triggerButtonHapticFeedback: jest.fn(),
}));

jest.mock("@/utils/animations", () => ({
  startShake: jest.fn(),
}));

describe("LogInModal", () => {
  const mockLogIn = jest.fn();
  const testEmail = "test@example.com";

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ logIn: mockLogIn });
  });

  test("displays error message with incorrect password", async () => {
    jest.setTimeout(15000);

    mockLogIn.mockResolvedValue(null);

    const { getByPlaceholderText, getByText, queryByText } = render(
      <LogInModal email={testEmail} />
    );

    const passwordInput = getByPlaceholderText("Enter your password");
    const loginButton = getByText("Log In");

    fireEvent.changeText(passwordInput, "wrongpassword");
    fireEvent.press(loginButton);

    await waitFor(
      () => {
        expect(mockLogIn).toHaveBeenCalledWith(testEmail, "wrongpassword");
        expect(getByText("Incorrect Password")).toBeTruthy();
        expect(startShake).toHaveBeenCalled();
      },
      { timeout: 10000 }
    );

    expect(router.replace).not.toHaveBeenCalled();
  }, 15000);

  test("navigates to app screen with correct password", async () => {
    mockLogIn.mockResolvedValue({
      /* mock session object */
    });

    const { getByPlaceholderText, getByText } = render(
      <LogInModal email={testEmail} />
    );

    const passwordInput = getByPlaceholderText("Enter your password");
    const loginButton = getByText("Log In");

    fireEvent.changeText(passwordInput, "correctpassword");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockLogIn).toHaveBeenCalledWith(testEmail, "correctpassword");
      expect(router.replace).toHaveBeenCalledWith("/app");
    });

    expect(triggerButtonHapticFeedback).toHaveBeenCalled();
  });

  test("displays email in uneditable input", () => {
    const { getByDisplayValue } = render(<LogInModal email={testEmail} />);
    expect(getByDisplayValue(testEmail)).toBeTruthy();
  });
});
