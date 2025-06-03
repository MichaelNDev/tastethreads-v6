function filterCards(meat) {
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
            // card.data.meat refers to the custom data attribute I made in the html "data-meat"
            const cardIngredient = card.dataset.meat;

                if (meat === 'all' || cardIngredient === meat) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }