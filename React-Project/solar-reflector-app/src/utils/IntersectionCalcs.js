import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const pointInPolygon = (point, polygonVertices) => {
    let crossings = 0;
    for (let i = 0, j = polygonVertices.length - 1; i < polygonVertices.length; j = i++) {
        if (((polygonVertices[i].y > point.y) !== (polygonVertices[j].y > point.y)) &&
            (point.x < (polygonVertices[j].x - polygonVertices[i].x) * (point.y - polygonVertices[i].y) / (polygonVertices[j].y - polygonVertices[i].y) + polygonVertices[i].x)) {
            crossings++;
        }
    }
    return (crossings % 2) === 1;
};

const lineIntersection = (p1, p2, p3, p4) => {
    const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
    if (d === 0) {
        return null;
    }
    const t = ((p1.y - p3.y) * (p4.x - p3.x) - (p1.x - p3.x) * (p4.y - p3.y)) / d;
    const u = ((p1.y - p3.y) * (p2.x - p1.x) - (p1.x - p3.x) * (p2.y - p1.y)) / d;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return new THREE.Vector3(
            p1.x + t * (p2.x - p1.x),
            p1.y + t * (p2.y - p1.y),
            0
        );
    }
    return null;
};

const convexHull = (points) => {
    const n = points.length;
    if (n <= 3) {
        return points;
    }

    let leftmostIndex = 0;
    for (let i = 1; i < n; i++) {
        if (points[i].x < points[leftmostIndex].x) {
            leftmostIndex = i;
        }
    }

    const hull = [];
    let currentPointIndex = leftmostIndex;
    do {
        hull.push(points[currentPointIndex]);
        let nextPointIndex = (currentPointIndex + 1) % n;
        for (let i = 0; i < n; i++) {
            if (i === currentPointIndex || i === nextPointIndex) {
                continue;
            }
            const position = ((points[i].y - points[currentPointIndex].y) * (points[nextPointIndex].x - points[currentPointIndex].x)) - ((points[nextPointIndex].y - points[currentPointIndex].y) * (points[i].x - points[currentPointIndex].x));
            if (position > 0 || (position === 0 && points[i].distanceTo(points[currentPointIndex]) > points[nextPointIndex].distanceTo(points[currentPointIndex]))) {
                nextPointIndex = i;
            }
        }
        currentPointIndex = nextPointIndex;
    } while (currentPointIndex !== leftmostIndex);

    return hull;
};

const polygonArea = (polygonVertices) => {
    let area = 0;
    const n = polygonVertices.length;
    for (let i = 0; i < n; i++) {
        area += (polygonVertices[i].x * polygonVertices[(i + 1) % n].y) - (polygonVertices[i].y * polygonVertices[(i + 1) % n].x);
    }
    return Math.abs(area / 2);
};

export { lineIntersection, convexHull, polygonArea };