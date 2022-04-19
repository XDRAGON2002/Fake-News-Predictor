import { render, screen } from "@testing-library/react"
import ArticlesList from "../components/ArticlesList"

describe("ArticlesList component", () => {
    it("Render articles list", () => {
        render(<ArticlesList />)
        expect(screen.getByTestId("list")).toBeInTheDocument()
        expect(screen.getAllByTestId("item").length > 0).toBeTruthy()
    })
})