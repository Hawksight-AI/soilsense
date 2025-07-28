// SoilSense - Charts JavaScript

// Chart Configuration
const chartConfig = {
    // Color palette for charts
    colors: {
        primary: '#10B981',
        secondary: '#F59E0B',
        accent: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
        light: '#E5E7EB',
        dark: '#374151'
    },
    
    // Font configuration
    font: {
        family: 'Inter, sans-serif',
        size: 12,
        weight: '500'
    },
    
    // Animation configuration
    animation: {
        duration: 2000,
        easing: 'easeOutQuart'
    }
};

// Chart Manager Class
class ChartManager {
    constructor() {
        this.charts = new Map();
        this.init();
    }
    
    init() {
        this.setupCharts();
        this.setupRealTimeUpdates();
    }
    
    // Setup all charts
    setupCharts() {
        this.createWheatPriceChart();
        this.createMustardPriceChart();
        this.createCropYieldChart();
        this.createWeatherChart();
        this.createMarketTrendChart();
    }
    
    // Create wheat price chart
    createWheatPriceChart() {
        const canvas = document.getElementById('wheat-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.1)');
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Wheat Price (₹/quintal)',
                    data: [2400, 2450, 2420, 2480, 2450, 2500, 2450],
                    borderColor: chartConfig.colors.primary,
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: chartConfig.colors.primary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: chartConfig.colors.primary,
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `₹${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: chartConfig.colors.dark,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: chartConfig.colors.light,
                            drawBorder: false
                        },
                        ticks: {
                            color: chartConfig.colors.dark,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            },
                            callback: function(value) {
                                return '₹' + value;
                            }
                        }
                    }
                },
                animation: {
                    duration: chartConfig.animation.duration,
                    easing: chartConfig.animation.easing
                }
            }
        });
        
        this.charts.set('wheat', chart);
    }
    
    // Create mustard price chart
    createMustardPriceChart() {
        const canvas = document.getElementById('mustard-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
        gradient.addColorStop(1, 'rgba(245, 158, 11, 0.1)');
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Mustard Price (₹/quintal)',
                    data: [5200, 5150, 5100, 5050, 5000, 4950, 4900],
                    borderColor: chartConfig.colors.secondary,
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: chartConfig.colors.secondary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: chartConfig.colors.secondary,
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `₹${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: chartConfig.colors.dark,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: chartConfig.colors.light,
                            drawBorder: false
                        },
                        ticks: {
                            color: chartConfig.colors.dark,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            },
                            callback: function(value) {
                                return '₹' + value;
                            }
                        }
                    }
                },
                animation: {
                    duration: chartConfig.animation.duration,
                    easing: chartConfig.animation.easing
                }
            }
        });
        
        this.charts.set('mustard', chart);
    }
    
    // Create crop yield chart
    createCropYieldChart() {
        const canvas = document.getElementById('crop-yield-chart');
        if (!canvas) return;
        
        const chart = new Chart(canvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Wheat', 'Mustard', 'Rice', 'Cotton'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        chartConfig.colors.primary,
                        chartConfig.colors.secondary,
                        chartConfig.colors.accent,
                        chartConfig.colors.info
                    ],
                    borderWidth: 0,
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                },
                animation: {
                    duration: chartConfig.animation.duration,
                    easing: chartConfig.animation.easing
                }
            }
        });
        
        this.charts.set('crop-yield', chart);
    }
    
    // Create weather chart
    createWeatherChart() {
        const canvas = document.getElementById('weather-chart');
        if (!canvas) return;
        
        const chart = new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Temperature (°C)',
                    data: [28, 26, 24, 25, 27, 26, 29],
                    backgroundColor: chartConfig.colors.accent,
                    borderColor: chartConfig.colors.accent,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderSkipped: false
                }, {
                    label: 'Humidity (%)',
                    data: [65, 70, 80, 75, 68, 72, 60],
                    backgroundColor: chartConfig.colors.info,
                    borderColor: chartConfig.colors.info,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        cornerRadius: 8
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: chartConfig.colors.dark,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: chartConfig.colors.light,
                            drawBorder: false
                        },
                        ticks: {
                            color: chartConfig.colors.dark,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            }
                        }
                    }
                },
                animation: {
                    duration: chartConfig.animation.duration,
                    easing: chartConfig.animation.easing
                }
            }
        });
        
        this.charts.set('weather', chart);
    }
    
    // Create market trend chart
    createMarketTrendChart() {
        const canvas = document.getElementById('market-trend-chart');
        if (!canvas) return;
        
        const chart = new Chart(canvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Wheat Trend',
                    data: [2400, 2450, 2500, 2480, 2520, 2500],
                    borderColor: chartConfig.colors.primary,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: chartConfig.colors.primary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }, {
                    label: 'Mustard Trend',
                    data: [5200, 5150, 5100, 5050, 5000, 4950],
                    borderColor: chartConfig.colors.secondary,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: chartConfig.colors.secondary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ₹${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: chartConfig.colors.dark,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: chartConfig.colors.light,
                            drawBorder: false
                        },
                        ticks: {
                            color: chartConfig.colors.dark,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            },
                            callback: function(value) {
                                return '₹' + value;
                            }
                        }
                    }
                },
                animation: {
                    duration: chartConfig.animation.duration,
                    easing: chartConfig.animation.easing
                }
            }
        });
        
        this.charts.set('market-trend', chart);
    }
    
    // Setup real-time updates
    setupRealTimeUpdates() {
        // Update charts every 30 seconds
        setInterval(() => {
            this.updateCharts();
        }, 30000);
    }
    
    // Update charts with new data
    updateCharts() {
        this.charts.forEach((chart, name) => {
            if (name === 'wheat' || name === 'mustard') {
                this.updatePriceChart(chart);
            } else if (name === 'weather') {
                this.updateWeatherChart(chart);
            }
        });
    }
    
    // Update price chart
    updatePriceChart(chart) {
        const newData = chart.data.datasets[0].data.map(value => {
            const change = Math.floor(Math.random() * 200) - 100;
            return Math.max(0, value + change);
        });
        
        chart.data.datasets[0].data = newData;
        chart.update('none');
    }
    
    // Update weather chart
    updateWeatherChart(chart) {
        const temperatureData = chart.data.datasets[0].data.map(() => {
            return Math.floor(Math.random() * 10) + 25;
        });
        
        const humidityData = chart.data.datasets[1].data.map(() => {
            return Math.floor(Math.random() * 30) + 60;
        });
        
        chart.data.datasets[0].data = temperatureData;
        chart.data.datasets[1].data = humidityData;
        chart.update('none');
    }
    
    // Get chart by name
    getChart(name) {
        return this.charts.get(name);
    }
    
    // Destroy chart
    destroyChart(name) {
        const chart = this.charts.get(name);
        if (chart) {
            chart.destroy();
            this.charts.delete(name);
        }
    }
    
    // Destroy all charts
    destroyAllCharts() {
        this.charts.forEach(chart => {
            chart.destroy();
        });
        this.charts.clear();
    }
}

// Price Prediction Chart
class PricePredictionChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.chart = null;
        this.init();
    }
    
    init() {
        if (this.canvas) {
            this.createPredictionChart();
        }
    }
    
    createPredictionChart() {
        const ctx = this.canvas.getContext('2d');
        
        // Historical data (last 7 days)
        const historicalData = [2400, 2450, 2420, 2480, 2450, 2500, 2450];
        
        // Predicted data (next 7 days)
        const predictedData = [2470, 2490, 2510, 2530, 2550, 2570, 2590];
        
        const labels = ['D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'Today', 'D+1', 'D+2', 'D+3', 'D+4', 'D+5', 'D+6'];
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Historical Prices',
                    data: [...historicalData, null, null, null, null, null, null, null],
                    borderColor: chartConfig.colors.primary,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: chartConfig.colors.primary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }, {
                    label: 'Predicted Prices',
                    data: [null, null, null, null, null, null, null, ...predictedData],
                    borderColor: chartConfig.colors.secondary,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointBackgroundColor: chartConfig.colors.secondary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                if (context.parsed.y !== null) {
                                    return `${context.dataset.label}: ₹${context.parsed.y}`;
                                }
                                return null;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: chartConfig.colors.dark,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: chartConfig.colors.light,
                            drawBorder: false
                        },
                        ticks: {
                            color: chartConfig.colors.dark,
                            font: {
                                family: chartConfig.font.family,
                                size: chartConfig.font.size
                            },
                            callback: function(value) {
                                return '₹' + value;
                            }
                        }
                    }
                },
                animation: {
                    duration: chartConfig.animation.duration,
                    easing: chartConfig.animation.easing
                }
            }
        });
    }
    
    updatePrediction(newPrediction) {
        if (this.chart) {
            this.chart.data.datasets[1].data = [null, null, null, null, null, null, null, ...newPrediction];
            this.chart.update();
        }
    }
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chart manager
    window.chartManager = new ChartManager();
    
    // Initialize prediction charts
    const predictionCharts = document.querySelectorAll('[id*="prediction"]');
    predictionCharts.forEach(canvas => {
        new PricePredictionChart(canvas.id);
    });
    
    console.log('📊 SoilSense charts initialized');
});

// Export chart classes for use in other modules
window.SoilSenseCharts = {
    ChartManager,
    PricePredictionChart,
    chartConfig
}; 