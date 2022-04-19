import { render, screen } from "@testing-library/react"
import News from "../pages/news"

describe("News page", () => {
    it("Render news page", () => {
        render(<News />)
        expect(screen.getByTestId("news")).toBeInTheDocument()
    })
})