/// <reference path="Scripts/jspack-vsdoc.js" />
/**
 * MindFusion JavaScript Pack - Operations Dashboard
 * Showcases:
 *  - MindFusion.DataViews: Virtualized 10,000-row Grid with sorting, filtering, editing, and selection
 *  - MindFusion.Charting: Interactive BarChart for Stock and Valuation by Category
 *  - MindFusion.Gauges: Executive OvalGauge for Fulfillment Rate & Stock Health KPI
 */

document.addEventListener("DOMContentLoaded", function () {
    var common = MindFusion.Common;
    var dv = MindFusion.DataViews;
    var Charting = MindFusion.Charting;
    var Gauges = MindFusion.Gauges;
    var Drawing = MindFusion.Drawing;
    var Collections = MindFusion.Common.Collections;

    // 1. Generate 10,000 operations inventory rows
    var allOrders = generateOrders(10000, 42);

    // Categories list defined in data.js
    var categoryList = ["Electronics", "Home", "Garden", "Sports", "Office"];

    // Palette for categories
    var categoryPalette = {
        "Electronics": "#3498db",
        "Home": "#1abc9c",
        "Garden": "#2ecc71",
        "Sports": "#e67e22",
        "Office": "#9b59b6"
    };

    // Current chart metric mode: "stock" or "valuation"
    var currentChartMetric = "stock";

    // --- 2. Setup MindFusion DataViews (Grid) ---
    var columns = [];

    var colId = new dv.GridColumn("ID");
    colId.dataType = dv.IntegerType;
    colId.caption = "#";
    colId.editable = false;
    colId.sortable = true;
    columns.push(colId);

    var colProduct = new dv.GridColumn("Product");
    colProduct.dataType = dv.StringType;
    colProduct.caption = "Product Name";
    colProduct.editable = true;
    colProduct.sortable = true;
    columns.push(colProduct);

    var colCategory = new dv.GridColumn("Category");
    colCategory.dataType = dv.LookupType;
    colCategory.caption = "Category";
    colCategory.editable = true;
    colCategory.sortable = true;
    colCategory.metaData.set("values", categoryList.map(function (c) { return [c]; }));
    columns.push(colCategory);

    var colPrice = new dv.GridColumn("Price");
    colPrice.dataType = dv.CurrencyType;
    colPrice.caption = "Price";
    colPrice.editable = true;
    colPrice.sortable = true;
    columns.push(colPrice);

    var colStock = new dv.GridColumn("Stock");
    colStock.dataType = dv.IntegerType;
    colStock.caption = "Stock Level";
    colStock.editable = true;
    colStock.sortable = true;
    columns.push(colStock);

    var colRating = new dv.GridColumn("Rating");
    colRating.dataType = dv.RealNumberType;
    colRating.caption = "Rating";
    colRating.editable = true;
    colRating.sortable = true;
    columns.push(colRating);

    var colRestocked = new dv.GridColumn("Restocked");
    colRestocked.dataType = dv.DateType;
    colRestocked.caption = "Restocked Date";
    colRestocked.editable = true;
    colRestocked.sortable = true;
    colRestocked.metaData.set("customEditor", {
        autoComplete: true,
        allowEmptyInput: true
    });
    columns.push(colRestocked);

    var gridElement = document.getElementById("grid");
    var grid = new dv.Grid(gridElement);
    grid.theme = "business";
    grid.model = new dv.ArrayModel(allOrders, columns, "ID");
    grid.allowEdit = true;
    grid.allowCellSelect = true;
    grid.allowAppend = false;
    grid.allowDelete = false;

    // Render grid
    grid.render();

    // --- 3. Setup MindFusion Gauges (OvalGauge) ---
    var gaugeElement = document.getElementById("gauge");

    function fitGaugeCanvas() {
        var wrapper = document.querySelector(".gauge-canvas-wrapper");
        if (!wrapper) return;
        var w = wrapper.clientWidth;
        var h = wrapper.clientHeight;
        if (w > 30 && h > 30) {
            var targetH = Math.min(h, 220);
            var targetW = Math.min(w, Math.round(targetH * 1.35));
            targetH = Math.min(targetH, Math.round(targetW / 1.25));
            gaugeElement.width = targetW;
            gaugeElement.height = targetH;
            if (gauge) {
                gauge.repaint();
            }
        }
    }
    fitGaugeCanvas();

    var gauge = Gauges.OvalGauge.create(gaugeElement, false);

    var scale = new Gauges.OvalScale(gauge);
    scale.minValue = 0;
    scale.maxValue = 100;
    scale.startAngle = 140;
    scale.endAngle = 400;
    scale.fill = "transparent";
    scale.stroke = "#cbd5e1";
    scale.startWidth = new Gauges.Length(8, Gauges.LengthType.Relative);
    scale.endWidth = new Gauges.Length(8, Gauges.LengthType.Relative);
    scale.scaleRelativeRadius = 0.68;
    scale.scaleRelativeCenter = new Drawing.Point(0.5, 0.52);
    scale.margin = new Drawing.Thickness(0.14, 0.14, 0.14, 0.14);

    // Major tick settings
    var majorTicks = scale.majorTickSettings;
    majorTicks.step = 20;
    majorTicks.fontSize = new Gauges.Length(8.5, Gauges.LengthType.Relative);
    majorTicks.numberPrecision = 0;
    majorTicks.labelAlignment = Gauges.Alignment.InnerCenter;
    majorTicks.labelOffset = new Gauges.Length(8, Gauges.LengthType.Relative);
    majorTicks.fill = "#334155";
    majorTicks.stroke = "transparent";
    majorTicks.labelForeground = "#334155";
    majorTicks.tickShape = Gauges.TickShape.Rectangle;
    majorTicks.tickWidth = new Gauges.Length(3, Gauges.LengthType.Relative);
    majorTicks.tickHeight = new Gauges.Length(1.5, Gauges.LengthType.Absolute);

    // Middle & Minor ticks
    scale.middleTickSettings.showLabels = false;
    scale.middleTickSettings.showTicks = false;
    scale.minorTickSettings.showLabels = false;
    scale.minorTickSettings.showTicks = false;

    // Operational KPI Health Ranges
    // Critical: 0 - 50% (Red)
    var rangeCritical = new Gauges.Range();
    rangeCritical.minValue = 0;
    rangeCritical.maxValue = 50;
    rangeCritical.fill = "#ef4444";
    rangeCritical.stroke = "transparent";
    rangeCritical.startWidth = new Gauges.Length(6, Gauges.LengthType.Relative);
    rangeCritical.endWidth = new Gauges.Length(6, Gauges.LengthType.Relative);
    scale.addRange(rangeCritical);

    // Warning: 50 - 80% (Amber)
    var rangeWarning = new Gauges.Range();
    rangeWarning.minValue = 50;
    rangeWarning.maxValue = 80;
    rangeWarning.fill = "#f59e0b";
    rangeWarning.stroke = "transparent";
    rangeWarning.startWidth = new Gauges.Length(6, Gauges.LengthType.Relative);
    rangeWarning.endWidth = new Gauges.Length(6, Gauges.LengthType.Relative);
    scale.addRange(rangeWarning);

    // Optimal: 80 - 100% (Green)
    var rangeOptimal = new Gauges.Range();
    rangeOptimal.minValue = 80;
    rangeOptimal.maxValue = 100;
    rangeOptimal.fill = "#10b981";
    rangeOptimal.stroke = "transparent";
    rangeOptimal.startWidth = new Gauges.Length(6, Gauges.LengthType.Relative);
    rangeOptimal.endWidth = new Gauges.Length(6, Gauges.LengthType.Relative);
    scale.addRange(rangeOptimal);

    // Needle pointer
    var gaugePointer = new Gauges.Pointer();
    gaugePointer.name = "fulfillmentPointer";
    gaugePointer.pointerWidth = new Gauges.Length(62, Gauges.LengthType.Relative);
    gaugePointer.pointerHeight = new Gauges.Length(6, Gauges.LengthType.Relative);
    gaugePointer.shape = Gauges.PointerShape.Needle;
    gaugePointer.fill = "#dc2626";
    gaugePointer.stroke = "#991b1b";
    gaugePointer.value = 0;
    scale.addPointer(gaugePointer);

    // --- 4. Setup MindFusion Charting (BarChart) ---
    var chartCanvas = document.getElementById("barChart");

    function fitChartCanvas() {
        if (!chartCanvas || !chartCanvas.parentElement) return;
        var p = chartCanvas.parentElement;
        var w = p.clientWidth;
        var h = p.clientHeight;
        if (w > 20 && h > 20) {
            chartCanvas.width = w;
            chartCanvas.height = h;
        }
    }
    fitChartCanvas();

    var chart = new Charting.Controls.BarChart(chartCanvas);
    chart.barLayout = Charting.BarLayout.SideBySide;
    chart.barSpacingRatio = 2;
    chart.showLegend = false;
    chart.xAxis.title = "Category";
    chart.yAxis.title = "Stock Units";
    chart.xAxis.showCoordinates = false;
    chart.theme.axisTitleFontSize = 11;
    chart.theme.axisLabelsFontSize = 10;
    chart.theme.dataLabelsFontSize = 10;
    chart.theme.gridColor1 = Drawing.Color.fromArgb(255, 255, 255);
    chart.theme.gridColor2 = Drawing.Color.fromArgb(245, 247, 250);

    // --- 5. Metrics Calculation & Synchronization ---
    function getVisibleRows() {
        var effModel = grid.effectiveModel;
        var count = effModel.rowCount;
        var rows = [];
        for (var i = 0; i < count; i++) {
            rows.push(effModel.getRowData(i));
        }
        return rows;
    }

    function calculateMetrics(rows) {
        var count = rows.length;
        var totalStock = 0;
        var totalValuation = 0;
        var lowStockCount = 0;
        var inStockCount = 0;
        var totalPrice = 0;

        var categoryTotals = {};
        for (var c = 0; c < categoryList.length; c++) {
            categoryTotals[categoryList[c]] = { stock: 0, valuation: 0, count: 0 };
        }

        for (var i = 0; i < count; i++) {
            var r = rows[i];
            var stock = Number(r.Stock) || 0;
            var price = Number(r.Price) || 0;
            var cat = r.Category;

            totalStock += stock;
            totalPrice += price;
            var val = stock * price;
            totalValuation += val;

            if (stock < 50) {
                lowStockCount++;
            }
            if (stock >= 20) {
                inStockCount++;
            }

            if (categoryTotals[cat]) {
                categoryTotals[cat].stock += stock;
                categoryTotals[cat].valuation += val;
                categoryTotals[cat].count++;
            }
        }

        // Fulfillment Rate: percentage of items ready/in-stock (stock >= 20)
        var fulfillmentRate = count > 0 ? Math.round((inStockCount / count) * 100) : 0;
        var avgStock = count > 0 ? Math.round(totalStock / count) : 0;
        var avgPrice = count > 0 ? (totalPrice / count).toFixed(2) : "0.00";

        return {
            count: count,
            totalStock: totalStock,
            totalValuation: totalValuation,
            lowStockCount: lowStockCount,
            fulfillmentRate: fulfillmentRate,
            avgStock: avgStock,
            avgPrice: avgPrice,
            categoryTotals: categoryTotals
        };
    }

    function formatCurrency(val) {
        if (val >= 1000000) {
            return "$" + (val / 1000000).toFixed(2) + "M";
        }
        if (val >= 1000) {
            return "$" + (val / 1000).toFixed(1) + "k";
        }
        return "$" + Math.round(val).toLocaleString();
    }

    function updateDashboard(highlightCategory) {
        var rows = getVisibleRows();
        var metrics = calculateMetrics(rows);

        // Update toolbar badges
        document.getElementById("kpiRowCount").innerText = metrics.count.toLocaleString() + " / " + allOrders.length.toLocaleString();
        document.getElementById("kpiValuation").innerText = formatCurrency(metrics.totalValuation);
        document.getElementById("kpiLowStock").innerText = metrics.lowStockCount.toLocaleString();

        // Update gauge stats
        document.getElementById("kpiFulfillmentRate").innerText = metrics.fulfillmentRate + "%";
        document.getElementById("kpiAvgStock").innerText = metrics.avgStock.toLocaleString();
        document.getElementById("kpiAvgPrice").innerText = "$" + metrics.avgPrice;

        // Update gauge
        fitGaugeCanvas();
        gaugePointer.value = metrics.fulfillmentRate;

        // Update Chart
        var catValues = [];
        var catLabels = [];
        var brushesList = [];

        for (var i = 0; i < categoryList.length; i++) {
            var catName = categoryList[i];
            var dataItem = metrics.categoryTotals[catName];
            var value = (currentChartMetric === "stock") ? dataItem.stock : Math.round(dataItem.valuation);

            catValues.push(value);
            catLabels.push(catName);

            var baseColor = categoryPalette[catName] || "#3498db";
            if (highlightCategory && highlightCategory !== catName) {
                // Dim other categories if one is selected/highlighted
                brushesList.push(new Drawing.Brush("#cbd5e1"));
            } else {
                brushesList.push(new Drawing.Brush(baseColor));
            }
        }

        var valuesCol = new Collections.List(catValues);
        var labelsCol = new Collections.List(catLabels);

        // Top labels showing formatted value
        var topLabels = new Collections.List(catValues.map(function (v) {
            return (currentChartMetric === "stock") ? v.toLocaleString() : formatCurrency(v);
        }));

        var barSeries = new Charting.BarSeries(valuesCol, null, topLabels, labelsCol);
        barSeries.supportedLabels = Charting.LabelKinds.XAxisLabel | Charting.LabelKinds.TopLabel;

        // Add 18% headroom to YAxis max so topLabels never clip
        var maxVal = Math.max.apply(null, catValues);
        chart.yAxis.minValue = 0;
        chart.yAxis.maxValue = maxVal > 0 ? Math.ceil(maxVal * 1.18) : 100;
        chart.yAxis.title = (currentChartMetric === "stock") ? "Stock Units" : "Inventory Valuation ($)";

        chart.series = new Collections.ObservableCollection([barSeries]);

        var seriesBrushes = new Collections.List();
        seriesBrushes.add(new Collections.List(brushesList));
        chart.plot.seriesStyle = new Charting.PerElementSeriesStyle(seriesBrushes);

        fitChartCanvas();
        if (chart.handleResize) {
            chart.handleResize();
        }
        chart.draw();
    }

    // --- 6. Event Wiring ---
    var searchInput = document.getElementById("searchInput");
    var categoryFilter = document.getElementById("categoryFilter");
    var stockFilter = document.getElementById("stockFilter");
    var resetFilterBtn = document.getElementById("resetFilterBtn");
    var btnViewStock = document.getElementById("btnViewStock");
    var btnViewValuation = document.getElementById("btnViewValuation");
    var chartTitle = document.getElementById("chartTitle");

    function applyFilters() {
        var searchVal = (searchInput.value || "").trim().toLowerCase();
        var catFilter = categoryFilter.value;
        var stockFilterVal = stockFilter.value;

        grid.filter = function (rowIdx, srcModel) {
            var row = srcModel.getRowData(rowIdx);
            if (!row) return false;

            // Category filter
            if (catFilter && row.Category !== catFilter) {
                return false;
            }

            // Stock level filter
            var stock = Number(row.Stock) || 0;
            if (stockFilterVal === "low" && stock >= 50) return false;
            if (stockFilterVal === "optimal" && (stock < 50 || stock > 300)) return false;
            if (stockFilterVal === "high" && stock <= 300) return false;

            // Search filter (Product name or ID)
            if (searchVal) {
                var nameMatch = row.Product && row.Product.toLowerCase().indexOf(searchVal) !== -1;
                var idMatch = String(row.ID) === searchVal;
                if (!nameMatch && !idMatch) return false;
            }

            return true;
        };

        updateDashboard();
    }

    searchInput.addEventListener("input", applyFilters);
    categoryFilter.addEventListener("change", applyFilters);
    stockFilter.addEventListener("change", applyFilters);

    resetFilterBtn.addEventListener("click", function () {
        searchInput.value = "";
        categoryFilter.value = "";
        stockFilter.value = "all";
        applyFilters();
    });

    // Chart metric toggle
    btnViewStock.addEventListener("click", function () {
        currentChartMetric = "stock";
        btnViewStock.classList.add("active");
        btnViewValuation.classList.remove("active");
        chartTitle.innerText = "Inventory Stock by Category";
        updateDashboard();
    });

    btnViewValuation.addEventListener("click", function () {
        currentChartMetric = "valuation";
        btnViewValuation.classList.add("active");
        btnViewStock.classList.remove("active");
        chartTitle.innerText = "Inventory Valuation ($) by Category";
        updateDashboard();
    });

    // Bi-directional Chart Click: clicking a bar filters grid to that category
    chart.dataItemClicked.addEventListener(function (sender, args) {
        if (args && args.index !== undefined && args.index >= 0 && args.index < categoryList.length) {
            var clickedCategory = categoryList[args.index];
            if (categoryFilter.value === clickedCategory) {
                categoryFilter.value = "";
            } else {
                categoryFilter.value = clickedCategory;
            }
            applyFilters();
        }
    });

    // Row selection in grid highlights selected category in chart
    grid.rowSelected.addEventListener(function (sender, args) {
        if (args && args.rowData && args.rowData.Category) {
            updateDashboard(args.rowData.Category);
        }
    });

    // In-line cell edits update KPIs, gauge, and chart in real time
    grid.rowUpdated.addEventListener(function (sender, args) {
        updateDashboard();
    });

    // Resize handling (window resize or sidebar expand/collapse)
    var resizeTimer = null;
    function handleResize() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            fitChartCanvas();
            if (chart.handleResize) {
                chart.handleResize();
            }
            if (chart) chart.draw();

            fitGaugeCanvas();
            if (grid && grid.adjust) grid.adjust();
        }, 80);
    }

    window.addEventListener("resize", handleResize);

    var expandBtn = document.getElementById("expandButton");
    if (expandBtn) {
        expandBtn.addEventListener("click", function () {
            setTimeout(handleResize, 50);
            setTimeout(handleResize, 200);
            setTimeout(handleResize, 400);
        });
    }

    // Initial render
    setTimeout(function () {
        updateDashboard();
    }, 20);
});
