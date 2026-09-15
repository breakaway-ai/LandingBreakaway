export type Pt = { X: number; Y: number };

export type Box = {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  z?: number;
};

export type Faces = { top: string; left: string; right: string };

export type Projection = ReturnType<typeof createProjection>;

/**
 * Flattened dimetric projection shared by the 3D scenes. `ky` of 0.5 would be
 * true isometric; smaller values keep wide boards from turning into tall
 * rhombi. Light is assumed from the upper left, so callers paint the left
 * face lighter than the right one.
 */
export function createProjection({
  unit,
  ky,
  origin,
}: {
  unit: number;
  ky: number;
  origin: { x: number; y: number };
}) {
  const cos = Math.cos(Math.PI / 6);

  const iso = (x: number, y: number, z = 0): Pt => ({
    X: origin.x + (x - y) * cos * unit,
    Y: origin.y + (x + y) * ky * unit - z * unit,
  });

  const pt = (p: Pt) => `${p.X.toFixed(2)} ${p.Y.toFixed(2)}`;
  const poly = (...pts: Pt[]) => `M${pts.map(pt).join("L")}Z`;
  const line = (...pts: Pt[]) => `M${pts.map(pt).join("L")}`;

  const boxFaces = ({ x, y, w, d, h, z = 0 }: Box): Faces => ({
    top: poly(
      iso(x, y, z + h),
      iso(x + w, y, z + h),
      iso(x + w, y + d, z + h),
      iso(x, y + d, z + h),
    ),
    left: poly(
      iso(x, y + d, z + h),
      iso(x + w, y + d, z + h),
      iso(x + w, y + d, z),
      iso(x, y + d, z),
    ),
    right: poly(
      iso(x + w, y, z + h),
      iso(x + w, y + d, z + h),
      iso(x + w, y + d, z),
      iso(x + w, y, z),
    ),
  });

  /** A circle lying on the ground plane projects to an axis-aligned ellipse. */
  const groundEllipse = (x: number, y: number, z: number, r: number) => {
    const c = iso(x, y, z);
    return {
      cx: c.X,
      cy: c.Y,
      rx: r * Math.SQRT2 * cos * unit,
      ry: r * Math.SQRT2 * ky * unit,
    };
  };

  const ellipsePath = (cx: number, cy: number, rx: number, ry: number) =>
    `M${(cx - rx).toFixed(2)} ${cy.toFixed(2)}A${rx} ${ry} 0 1 0 ${(cx + rx).toFixed(2)} ${cy.toFixed(2)}A${rx} ${ry} 0 1 0 ${(cx - rx).toFixed(2)} ${cy.toFixed(2)}Z`;

  return {
    unit,
    ky,
    cos,
    iso,
    poly,
    line,
    boxFaces,
    groundEllipse,
    ellipsePath,
  };
}
