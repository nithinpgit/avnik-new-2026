import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CropperModal from "./CustomeCroppie";
const Croppie = require("croppie");
const Croppie = require("croppie");

// Mock Croppie class
jest.mock("croppie", () => {
    return jest.fn().mockImplementation(() => ({
        destroy: jest.fn(),
        rotate: jest.fn(),
        bind: jest.fn(),
        result: jest.fn().mockImplementation((opts) => {
            if (opts === "base64") {
                return Promise.resolve("base64string");
            }
            return Promise.resolve(new Blob(["test"], { type: "image/jpeg" }));
        }),
    }));
});

// Mock FileReader
class MockFileReader {
    constructor() {
        this.onload = null;
        this.onerror = null;
        this.result = "data:image/jpeg;base64,abc";
    }
    readAsDataURL(file) {
        if (this.onload) {
            this.onload();
        }
    }
}
global.FileReader = MockFileReader;

describe("CropperModal", () => {
    const options = { viewport: { width: 100, height: 100 } };
    const size = { width: 100, height: 100 };
    const buttonText = "Crop";
    const buttonClass = "custom-btn";
    const onCrop = jest.fn();

    beforeEach(() => {
        // Set up the DOM element for Croppie
        document.body.innerHTML = '<div id="croppie-container"></div>';
        jest.clearAllMocks();
    });

    it("renders correctly with no value", () => {
        const { getByText, getByRole } = render(
            <CropperModal
                options={options}
                size={size}
                onCrop={onCrop}
                value={[]}
                buttonText={buttonText}
                buttonClass={buttonClass}
            />
        );
        expect(getByText(buttonText)).toBeInTheDocument();
        expect(getByRole("button", { name: buttonText })).toBeDisabled();
    });

    it("renders rotate buttons when value is present", () => {
        const file = new File(["dummy"], "test.jpg", { type: "image/jpeg" });
        const { container } = render(
            <CropperModal
                options={options}
                size={size}
                onCrop={onCrop}
                value={[file]}
                buttonText={buttonText}
                buttonClass={buttonClass}
            />
        );
        const rotateBtns = container.querySelectorAll(".rotate-btn");
        expect(rotateBtns.length).toBe(2);
        expect(rotateBtns[0]).not.toBeDisabled();
        expect(rotateBtns[1]).not.toBeDisabled();
    });

    it("calls rotate on Croppie when rotate buttons are clicked", () => {
        const file = new File(["dummy"], "test.jpg", { type: "image/jpeg" });
        const { container } = render(
            <CropperModal
                options={options}
                size={size}
                onCrop={onCrop}
                value={[file]}
                buttonText={buttonText}
                buttonClass={buttonClass}
            />
        );
        const rotateBtns = container.querySelectorAll(".rotate-btn");
        fireEvent.click(rotateBtns[0]);
        fireEvent.click(rotateBtns[1]);
        expect(Croppie.mock.instances[0].rotate).toHaveBeenCalledWith(90);
        expect(Croppie.mock.instances[0].rotate).toHaveBeenCalledWith(-90);
    });

    it("calls onCrop with a File when form is submitted", async () => {
        const file = new File(["dummy"], "test.jpg", { type: "image/jpeg" });
        const { getByRole } = render(
            <CropperModal
                options={options}
                size={size}
                onCrop={onCrop}
                value={[file]}
                buttonText={buttonText}
                buttonClass={buttonClass}
            />
        );
        const submitBtn = getByRole("button", { name: buttonText });
        fireEvent.click(submitBtn);
        await waitFor(() => {
            expect(onCrop).toHaveBeenCalled();
            expect(onCrop.mock.calls[0][0]).toBeInstanceOf(File);
        });
    });

    it("shows preloader when buttonPreloader is true", () => {
        const file = new File(["dummy"], "test.jpg", { type: "image/jpeg" });
        const { getByText } = render(
            <CropperModal
                options={options}
                size={size}
                onCrop={onCrop}
                value={[file]}
                buttonText={buttonText}
                buttonClass={buttonClass}
                buttonPreloader={true}
            />
        );
        expect(getByText("wait...")).toBeInTheDocument();
    });

    it("destroys Croppie instance on unmount", () => {
        const file = new File(["dummy"], "test.jpg", { type: "image/jpeg" });
        const { unmount } = render(
            <CropperModal
                options={options}
                size={size}
                onCrop={onCrop}
                value={[file]}
                buttonText={buttonText}
                buttonClass={buttonClass}
            />
        );
        unmount();
        expect(Croppie.mock.instances[0].destroy).toHaveBeenCalled();
    });
});

// We recommend installing an extension to run jest tests.