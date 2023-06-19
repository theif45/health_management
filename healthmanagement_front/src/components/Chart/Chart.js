/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ResponsiveLine } from "@nivo/line";
import React from "react";

const tooltip = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 280px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 5px;
    width: 150px;
    height: 60px;
`;

const CustomTooltip = ({ point }) => {
    return (
        <div css={tooltip}>
            <p>{`Date: ${point.data.xFormatted}`}</p>
            <p>{`Count: ${point.data.yFormatted}`}</p>
        </div>
    );
};

const Chart = ({ data, color }) => {
    const maxPoint = Math.max(...data[0].data.map((point) => point.y));
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 30, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: 0,
                max: maxPoint > 10 ? maxPoint + (10 - (maxPoint % 10)) : maxPoint + 1,
                stacked: true,
                reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            pointSize={5}
            axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                tickValues:
                    maxPoint > 10
                        ? Array.from({ length: maxPoint / 10 + 2 }, (_, i) => 10 * i)
                        : Array.from({ length: maxPoint + 2 }, (_, i) => i),
            }}
            colors={color}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            tooltip={CustomTooltip}
            gridYValues={
                maxPoint > 10
                    ? Array.from({ length: maxPoint / 10 + 2 }, (_, i) => 10 * i)
                    : Array.from({ length: maxPoint + 2 }, (_, i) => i)
            }
            theme={{
                axis: {
                    ticks: {
                        text: {
                            fontSize: 14,
                        },
                    },
                },
            }}
        />
    );
};

export default Chart;
