describe("Testa o visual", () => {
    it("should open the site", () => {
        cy.visit("https://thetetris.herokuapp.com/");
    });

    it("should start", () => {
        cy.wait(2000);
        cy.get(".on-stoped > .play-button").click();
        cy.get("body").should("have.class", "gaming");
    })

    it("should pause", () => {
        cy.wait(5000);
        cy.get(".on-gaming-paused > .pause-button").click();
        cy.get("body").should("have.class", "paused");
    })

    it("should reset", () => {
        cy.wait(2000);
        cy.get(".on-gaming-paused > .stop-button").click();
        cy.get("body").should("have.class", "stoped");
    })

    it("should change game volume", () => {
        cy.wait(2000);
        cy.get("#audio-slider")
        .invoke("val", 5)
        .trigger("input")
        .click();
    })

    it("should game over", () => {
        cy.wait(1000);
        cy.get(".on-stoped > .play-button").click();
        
        cy.wait(1000);
        for (var i = 0; i < 120; i++) {
            cy.get("body").type("{downarrow}");
            cy.wait(10);
        }
        
        cy.get("#game-over-modal").should("have.class", "active");
    })

    it("Should exit of game over modal", () => {
        cy.wait(1000);
        cy.get(".modal-btns > .stop-button").click();
    });
})