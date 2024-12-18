import express from "express";
import { StudentController } from "../controllers/student.controller";
import { ValidateToken } from "../middleware/auth.middleware";
import { AssessmentController } from "../controllers/assessments.controller";

const router = express.Router();

const studentController = new StudentController();
const assessmentController = new AssessmentController();

// Listar todos os alunos
router.get("/students", studentController.index);

// Cadastrar novo aluno
router.post("/students", studentController.store);

// Pesquisar um aluno por ID
router.get("/students/:id", studentController.show);

// Atualiza um aluno
router.put("/students/:id", studentController.update);

// Exclui um aluno
router.delete("/students/:id", studentController.delete);

// Listar avaliações
router.get(
  "/students/:studentId/assessments",
  ValidateToken,
  assessmentController.index
);

// Criar avaliações
router.post(
  "/students/:studentId/assessments",
  ValidateToken,
  assessmentController.store
);

// Listar uma avaliação
router.get(
  "/students/:studentId/assessments/:id",
  ValidateToken,
  assessmentController.show
);

// Deletar uma avaliação
router.delete(
  "/students/:studentId/assessments/:id",
  ValidateToken,
  assessmentController.delete
);

// Atualizar uma avaliação
router.put(
  "/students/:studentId/assessments/:id",
  ValidateToken,
  assessmentController.update
);

export default router;
