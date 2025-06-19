document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('spf-form');
    const recommendationDiv = document.getElementById('recommendation');
    const skinType = document.getElementById('skin-type');
    const activityLevel = document.getElementById('activity-level');
    const environment = document.getElementById('environment');

    // Function to reset the recommendation
    function resetRecommendation() {
        recommendationDiv.textContent = '';
    }

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const skinTypeValue = skinType.value;
        const activityLevelValue = activityLevel.value;
        const environmentValue = environment.value;

        let recommendation = '';

        if (skinTypeValue === 'fair') {
            if (activityLevelValue === 'high' && environmentValue === 'outdoor') {
                recommendation = 'Use SPF 50+ and reapply every 2 hours.';
            } else if (activityLevelValue === 'medium' && environmentValue === 'outdoor') {
                recommendation = 'Use SPF 30 and reapply every 2 hours.';
            } else {
                recommendation = 'Use SPF 15 and reapply every 3 hours.';
            }
        } else if (skinTypeValue === 'medium') {
            if (activityLevelValue === 'high' && environmentValue === 'outdoor') {
                recommendation = 'Use SPF 30 and reapply every 2 hours.';
            } else if (activityLevelValue === 'medium' && environmentValue === 'outdoor') {
                recommendation = 'Use SPF 15 and reapply every 2 hours.';
            } else {
                recommendation = 'Use SPF 15 and reapply every 3 hours.';
            }
        } else if (skinTypeValue === 'dark') {
            if (activityLevelValue === 'high' && environmentValue === 'outdoor') {
                recommendation = 'Use SPF 15 and reapply every 2 hours.';
            } else if (activityLevelValue === 'medium' && environmentValue === 'outdoor') {
                recommendation = 'Use SPF 15 and reapply every 3 hours.';
            } else {
                recommendation = 'Use SPF 15 and reapply every 4 hours.';
            }
        }

        recommendationDiv.textContent = recommendation;
    });

    // Event listeners for dropdown changes
    skinType.addEventListener('change', resetRecommendation);
    activityLevel.addEventListener('change', resetRecommendation);
    environment.addEventListener('change', resetRecommendation);
});
