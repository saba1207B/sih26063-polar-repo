/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

import { type ClassValue, clsx } from "clsx";

/**
 * Merge Tailwind classes with clsx.
 * Lightweight alternative to tailwind-merge for this project scope.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
