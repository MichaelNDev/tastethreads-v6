function filterCards(meat) {
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
            const cardIngredient = card.dataset.meat;

                if (meat === 'all' || cardIngredient === meat) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }