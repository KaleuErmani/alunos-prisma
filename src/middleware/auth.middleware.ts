import { NextFunction, Request, Response } from "express";
import { repository } from "../database/prisma.connection";

export async function ValidateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { authorization } = request.headers;
    const { studentId } = request.params;

    if (!authorization) {
      return response.status(401).json({
        success: false,
        code: response.statusCode,
        message: "token de autentificação não informado.",
      });
    }

    const student = await repository.student.findUnique({
      where: { id: studentId },
    });

    if (!student || student.token !== authorization) {
      return response.status(401).json({
        success: false,
        code: response.statusCode,
        message: "token de autentificação inválido.",
      });
    }

    next();
  } catch (error: any) {
    return response.status(500).json({
      success: false,
      code: response.statusCode,
      message: `Autentificação falhou: ${error.toString()}`,
    });
  }
}
