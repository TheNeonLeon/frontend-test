import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Form from "./Form"

describe("Form", () => {
    it("renders text", () => {
        render(<Form />);
        expect(screen.getByText("Personal Information")).toBeInTheDocument();
    })
})