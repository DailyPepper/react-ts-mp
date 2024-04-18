import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Contacts from './index';

describe("Contact", () => {
   test("отображает форму с полями ввода", () => {
      render(<Contacts />);
      
      const nameInput = screen.getByPlaceholderText("Имя");
      const ageInput = screen.getByPlaceholderText("Возраст");
      const numberInput = screen.getByPlaceholderText("Номер телефона");
      
      expect(nameInput).toBeTruthy();
      expect(ageInput).toBeTruthy();
      expect(numberInput).toBeTruthy();
   });
});
